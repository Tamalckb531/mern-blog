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

        //? Token generation with admin feature
        const token = jwt.sign(
            { id: validUser._id, isAdmin: validUser.isAdmin },
            process.env.JWT_SECRET
        );

        //? sending token as cookie

        const { password: pass, ...rest } = validUser._doc; //* separating password for not to sent it in response

        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json(rest);

    } catch (error) {
        next(error);
    }
}

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;

    try {
        //? Finding the user :
        const user = await User.findOne({ email });

        //? On users existence 
        if (user) {

            //? creating token and sending the info without password
            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = user._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);

        } else { //? On users non-existence 

            //? generating password and hashing it for new user
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);

            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            //? creating new user with name, email, pass and picture
            const newUser = new User({
                username:
                    name.toLowerCase().split(' ').join('') +
                    Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });

            await newUser.save();

            //? creating token and sending the info without password
            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET
            );
            const { password, ...rest } = newUser._doc;
            res
                .status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};

