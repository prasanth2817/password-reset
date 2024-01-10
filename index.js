import express from "express"
import AppRoutes from "./src/Routes/index.js"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
const app= express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT

app.use("/",AppRoutes)

app.listen(PORT,()=>console.log(`Server is listening to port ${PORT}`))