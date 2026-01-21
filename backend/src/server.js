import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app'


dotenv.config()

const PORT = process.env.port || 5000;

mongoose    
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully")
        app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`);
        })
    })
    .catch((err) => console.log(err));