const mongoose = require ('mongoose')
const validator = require ('validator')
const bcryptjs = require ('bcryptjs')
const jwt = require ('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema ( {
    username : {
        type: String,
        required : true,
        trim : true
    },
    password : {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value){
            let password = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
            if(!password.test(value)){
                throw new Error("Password must include uppercase , lowercase , numbers , speacial characters")
            }
        }
    },
    email : {
        type: String,
        required: true,
        trim: true,
        lowercase : true,
        unique: true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error ('Email is INVALID')
            }
        }
    },
    role : {
      type: String,
      default : "user",
      trim: true,
  },
    tokens :  [
        {
          token: String,
          sessionId: String,
          deviceInfo: String,
          createdAt: {
            type: Date,
            default: Date.now,
          },
          expiresAt: Date
        }
      ],
      refreshTokens: [
        {
          token: String,
          sessionId: String,
          deviceInfo: String,
          createdAt: {
            type: Date,
            default: Date.now,
          },
          expiresAt: Date
        }
      ]
})

userSchema.pre ("save" , async function ()  {
       const user = this   //  => Document 
       if (user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 10)
       }
})
//////////////////////////////////////////////////////////////////////////////////////////
// Login 

userSchema.statics.findByCredentials = async (em,pass) =>{
  
    const user = await User.findOne({email:em})
    if(!user){
        throw new Error('Unable to login')
    }
   
    const isMatch = await bcryptjs.compare(pass,user.password)
  
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

//////////////////////////////////////////////////////////////////////////////////////////

userSchema.methods.generateToken = async function (deviceInfo) {
     const user = this 
     const sessionId = uuidv4();

     await user.cleanExpiredTokens();

     const accessToken = jwt.sign ({_id:user._id.toString() ,sessionId  } , process.env.ACCESS_TOKEN_SECRET , {expiresIn : '15s'})
     const refreshToken = jwt.sign({_id:user._id.toString() ,sessionId  } , process.env.REFRESH_TOKEN_SECRET , {expiresIn : '1d'})

     const now = new Date();
     const accessExpiry = new Date(now.getTime() + 15 * 1000);
     const refreshExpiry = new Date(now.getTime() + 24* 60 *60 * 1000);

     user.tokens.push({
        token: accessToken,
        sessionId,
        deviceInfo,
        createdAt: now,
        expiresAt: accessExpiry
      });
    
      user.refreshTokens.push({
        token: refreshToken,
        sessionId,
        deviceInfo,
        createdAt: now,
        expiresAt: refreshExpiry
      });
    
      await user.save();
    
      return { accessToken, refreshToken, sessionId };
  }

  userSchema.methods.cleanExpiredTokens = async function () {
    const user = this;
    const now = new Date();
  
    user.tokens = user.tokens.filter(t => t.expiresAt > now);
    user.refreshTokens = user.refreshTokens.filter(t => t.expiresAt > now);
  
    await user.save();
  };
  
  userSchema.methods.toJSON = function (){
      const user = this 
      const userObject = user.toObject()

      delete userObject.password
      delete userObject.tokens

      return userObject 
  }


const User = mongoose.model( 'User' , userSchema  )


module.exports = User