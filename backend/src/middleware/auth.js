const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).send({ error: 'No token provided' });

        let decoded;
        let tokenType;

        try {
            decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            tokenType = 'access';
        } catch (err) {
            try {
                decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
                tokenType = 'refresh';
            } catch (err) {
                throw new Error('Invalid token');
            }
        }

        const user = await User.findById(decoded._id);
        if (!user) throw new Error('User not found');

        await user.cleanExpiredTokens();

        let isValidToken = false;
        if (tokenType === 'access') {
            isValidToken = user.tokens.some(t => t.token === token && t.sessionId === decoded.sessionId);
        } else {
            isValidToken = user.refreshTokens.some(t => t.token === token && t.sessionId === decoded.sessionId);
        }

        if (!isValidToken) throw new Error('Token not recognized');

        req.user = user;
        req.token = token;
        req.sessionId = decoded.sessionId;
        next();

    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};

function isUser(req, res, next) {
    if (req.user.role !== "user") return res.sendStatus(403);
    next();
  }
  
  function isAdmin(req, res, next) {
    if (req.user.role !== "admin") return res.sendStatus(403);
    next();
  }

module.exports = {auth ,
    isUser ,
    isAdmin
};
