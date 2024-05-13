import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    //? checking edge cases for null info 
    if (!username ||
        !email ||
        !password ||
        username === "" ||
        email === "" ||
        password === "") {

        return res.status(400).json({ msg: "All fields are required" });
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
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}