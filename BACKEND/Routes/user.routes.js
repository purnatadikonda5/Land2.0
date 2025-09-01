import express from 'express';
import { body } from 'express-validator';
import * as userController from '../Controllers/user.controller.js';
let userrouter=express.Router();

userrouter.post("/login",
    body('Email').isEmail().withMessage("Email must be a valid email address"),
    body('Password').isLength({min: 3}).withMessage("password should be atleast 3 characters long"),userController.loginController);

userrouter.post("/signup",
    body('Email').isEmail().withMessage("Email must be a valid email address"),
    body('Password').isLength({min:3}).withMessage("password should be atleast 3 characters long"),
    body('PhoneNumber').isLength({min:10 , max:10}).withMessage("Phone number should be of 10 numbers"),
    body('Name').isAlpha().withMessage("Name should be in alphabetic"),userController.signUpController);
userrouter.post("/verifyEmail",userController.verifyEmailController);
userrouter.post("/createVerificationCode",userController.createVerificationCodeController);
export default userrouter;