const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')

exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({ message: "User not found." })
    }

     if (user.isBlocked) {
      return res.status(403).json({ message: "User is blocked" })    }

    req.user = {
      userId: user._id,
      username: user.username,
      email: user.email, 
    }
    next()  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." })  }
}

