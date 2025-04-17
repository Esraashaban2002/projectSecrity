require('dotenv').config()
const express = require ('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors');

 require ('./db/connection')

 app.use(express.json())

 app.use(cors({
    origin: 'http://localhost:3001', // غيّر حسب حالة المشروع
    credentials: true
  }));
 

 const userRouter = require("./routers/userAuth")
 app.use(userRouter)



app.listen(port,  () => {
    console.log(`Server running on port ${port}`)
  })