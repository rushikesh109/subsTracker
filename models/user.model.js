import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema( {
    name: {
        type: String, 
        required: [true, 'User Name is required'],
        trim: true,
        minLength: 3,
        maxLength: 30,
    },
    email: {
        type: String,
        required:[true, 'User Email is required'],
        unique: true,
        trim: true,
        lowercase:true,
        match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a vaild email adress']
    },
    password: {
        type: String,
        required: [true, 'User Password is required'],
        minLength: 6,
    }
}, ({Timestamp: true})
)

const User = mongoose.model('User', userSchema);

export default User;