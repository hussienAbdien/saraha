const express = require('express')
const connectDB = require('./DB/config')
const { userRouter } = require('./router/app')
const app = express()
const port = 4000

app.use(express.json())
app.use(userRouter)
connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
