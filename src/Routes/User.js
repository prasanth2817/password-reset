import express from "express"
import useController from "../Controller/User.js"
import Auth from "../Common/Auth.js"
const router= express.Router()

router.get('/',Auth.validate,useController.getUsers)
router.post("/create",useController.createUsers)
router.delete("/:id",useController.deleteUser)
router.post("/login",useController.Login)
router.post("/forgot-password",useController.forgotPassword)
router.post("/reset-password",Auth.validate,useController.resetPassword)

export default router
