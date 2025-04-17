const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/register' , (req , res)=>{
    const user = new User (req.body)
    user.save()
    .then ((user) => {res.status(200).send(user)})
    .catch((e)=>{ res.status(400).send(e)})
})

router.post('/login' , async(req , res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        // const token = await user.generateToken()
        // const refreshToken = user.refreshToken()
        const deviceInfo = req.headers['user-agent'] || 'Unknown Device'; // تقدر ترسله من الـ client
        const { accessToken, refreshToken, sessionId } = await user.generateToken(deviceInfo);

        res.status(200).send({ user, accessToken, refreshToken, sessionId})
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


module.exports = router 