const mongoose = require('mongoose')
const express = require('express')
const app = express()
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const cors = require('cors')
const PORT = 9999



mongoose.connect('mongodb://localhost:27017/popular')
    .then(() => {
        console.log('Data base is connected')
    })
    .catch((error) => {
        console.log(error)
    })
app.use(cors())
app.use(express.json())

app.use('/',userRoute)
app.use('/admin',adminRoute)


app.listen(PORT,()=>{
    console.log(`server is running on the ${PORT}`)
})




