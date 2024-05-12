import dotenv from 'dotenv';
import express from 'express'
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(
    () => {
        console.log("MongoDb is connected");
    }
).catch(err => {
    console.log("There is an error : ", err);
})

const app = express();

app.listen(3000, () => {
    console.log('server is running on port 3000 :)');
})