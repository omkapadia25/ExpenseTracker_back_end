const { json } = require('express')
const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
    // check header
    try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw "unAuthorised access"
    }
    const token = authHeader.split(' ')[1]
  
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      // attach the user to the job routes
      req.user = { userId: payload.userId, name: payload.name }
      next()
    } catch (error) {
                res.status(401).json(error)
    }
  }
  
  module.exports = auth