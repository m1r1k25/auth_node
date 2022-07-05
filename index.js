import express from "express";
import mongoose from "mongoose"; 
import authRouter from "./authRouter.js";

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use('/auth', authRouter)

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://auth111:auth111@cluster.odjs2yo.mongodb.net/?retryWrites=true&w=majority`)
    app.listen(PORT, () => console.log('server started on ' + PORT))
  } catch(e) {
    console.log(e)
  }
} 

start()