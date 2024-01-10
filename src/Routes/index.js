import express from "express"
import UsersRoutes from "./User.js"
const router= express.Router()

router.use("/user",UsersRoutes)

export default router
