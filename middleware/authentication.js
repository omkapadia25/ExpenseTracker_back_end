const { json } = require('express')
const jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
  const token = req.cookies.token;
  // console.log("hello")
  // console.log(token)
  try{
    if(!token){
        res.status(400).json({"valid":false})
    }
    // console.log("hello")
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.userId, name: payload.name }
    next()

  }
  catch(err){

  }

  }
  
  module.exports = auth