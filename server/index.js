const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.roures")
const workoutRouter = require("./routes/workout.routes")
const fileUpload = require("express-fileupload")
const app = express()
const PORT = config.get('serverPort')
const corsMiddleware = require('./middleware/cors.middleware')

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use(express.static('static'))
app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)
// app.use("/api/workouts", workoutRouter)


const start = async () => {
  try {
    await mongoose.connect(config.get("dBUrl"), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    app.listen(PORT, () => {
      console.log('Server started on port ', PORT)
    })
  } catch (e) {
    console.log(e)
  }
}

start()