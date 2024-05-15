import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

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

export const signin = async (req, res, next) => {
    const { email, password } = req.body;


    //? checking edge cases for null info 
    if (!email ||
        !password ||
        email === "" ||
        password === "") {

        next(errorHandler(400, "All fields are required"));
    }

    try {
        //? validation users email and password
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }

        //? Token generation
        const token = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET,
        )

        //? sending token as cookie

        const { password: pass, ...rest } = validUser._doc; //* separating password for not to sent it in response

        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json(rest);

    } catch (error) {
        next(error);
    }
}

