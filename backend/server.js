const mongoose = require('mongoose')
const express = require('express')
const app = express()
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const PORT = 9999

mongoose.connect('mongodb://localhost:27017/popular')
  .then(() => {
    console.log('Database is connected')
  })
  .catch((error) => {
    console.log(error)
  })

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true                
}))

app.use(express.json())
app.use(cookieParser())

app.use('/', userRoute)
app.use('/admin', adminRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
