const handelValidation = require("../../middleware/handelValidation")
const { login } = require("./controller/signIn")
const {signUp, confirmEmail} = require("./controller/signUp")
const {signUpValidator, confirmEmailValidator} = require("./validation")

const router=require("express").Router()


router.post("/signUp",signUpValidator,handelValidation(),signUp)
router.get("/confirmEmail/:token",confirmEmailValidator,handelValidation(),confirmEmail)
router.post("/login",signUpValidator[1,2],handelValidation(),login)

module.exports=router