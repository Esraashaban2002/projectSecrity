const express = require('express')
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');
const router = express.Router()
const auth = authMiddleware.auth
 
router.post('/register' , (req , res)=>{
    const user = new User (req.body)
    user.save()
    .then ((user) => {res.status(200).send(user)})
    .catch((e)=>{ res.status(400).send(e)})
})

router.post('/login' , async(req , res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)

        const deviceInfo = req.headers['user-agent'] || 'Unknown Device';
        const { accessToken, refreshToken, sessionId } = await user.generateToken(deviceInfo);

        res.status(200).send({ user, accessToken, refreshToken, sessionId , role : user.role })
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

router.delete('/logout', auth, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(el => el.sessionId !== req.sessionId);
      req.user.refreshTokens = req.user.refreshTokens.filter(el => el.sessionId !== req.sessionId);
  
      await req.user.save();
      res.send({ message: 'Logged out from this session.' });
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });
  
  router.delete('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        req.user.refreshTokens = [];
        await req.user.save();
        res.send({ message: 'Logged out from all sessions.' });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

router.post('/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(401).send({ error: 'No refresh token provided' });

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decoded._id);
        if (!user) throw new Error('User not found');

        await user.cleanExpiredTokens();

        const session = user.refreshTokens.find(t => t.token === refreshToken && t.sessionId === decoded.sessionId);
        if (!session) throw new Error('Refresh token invalid');

        // إنشاء accessToken جديد
        const accessToken = jwt.sign(
          { _id: user._id.toString(), sessionId: decoded.sessionId },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '30s'}
        );

        const now = new Date();
        const accessExpiry = new Date(now.getTime() + 30 * 1000);

        user.tokens.push({
          token: accessToken,
          sessionId: decoded.sessionId,
          deviceInfo: session.deviceInfo,
          createdAt: now,
          expiresAt: accessExpiry
        });

        await user.save();

        res.send({ accessToken });
    } catch (e) {
        res.status(401).send({ error: e.message });
    }
});


module.exports = router 