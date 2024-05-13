import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    //? checking edge cases for null info 
    if (!username ||
        !email ||
        !password ||
        username === "" ||
        email === "" ||
        password === "") {

        next(errorHandler(400, "All fields are required"));
    }

    //? Hash password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    //? data modelling 
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    //? data saving
    try {
        await newUser.save();
        res.json({ msg: "Sign-up successful" })
    } catch (error) {
        next(error); //? sending the error in global catch
    }
}