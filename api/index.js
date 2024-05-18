import dotenv from 'dotenv';
import express from 'express'
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(
    () => {
        console.log("MongoDb is connected");
    }
).catch(err => {
    console.log("There is an error : ", err);
})

const app = express();

app.use(express.json()); //? This helps to retrieve the json sent via post request

app.listen(3001, () => {
    console.log('server is running on port 3001 :)');
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

//? Global catch -> run at the last and catch all the thrown res
app.use((err, req, res, next) => {
    const statuscode = err.statuscode || 500;
    const message = err.message || "Internal server error";

    res.status(statuscode).json({
        success: false,
        statuscode,
        message
    })
})