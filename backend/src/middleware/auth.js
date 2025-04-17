const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).send({ error: 'No token provided' });

        let decoded;
        let tokenType;

        // محاولة فك التوكن كمفتاح Access
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

        // جلب المستخدم
        const user = await User.findById(decoded._id);
        if (!user) throw new Error('User not found');

        // تنظيف التوكنات المنتهية
        await user.cleanExpiredTokens();

        // التحقق من وجود التوكن بنفس sessionId
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





// const auth = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ','')
//         if(token == null) return res.status(401).send(error)

//         let decoded;
//         let tokenType;

//         // محاولة فك التوكن كمفتاح Access
//         try {
//             decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//             tokenType = 'access';
//         } catch (err) {
//             // لو فشل، نحاول كمفتاح Refresh
//             try {
//                 decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
//                 tokenType = 'refresh';
//             } catch (err) {
//                 throw new Error('Invalid token');
//             }
//         }

//         // نحاول إيجاد المستخدم حسب نوع التوكن
//         let user;
//         if (tokenType === 'access') {
//             user = await User.findOne({ _id: decoded._id, tokens: token });
//         } else {
//             user = await User.findOne({ _id: decoded._id, refreshTokens: token });
//         }

//         if (!user) {
//             throw new Error('User not found');
//         }

//         req.user = user;
//         req.token = token;
//         next();

//     } catch (e) {
//         res.status(401).send({ error: 'Please authenticate' });
//     }
// };

module.exports = auth;
