import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        default: "-"
    },
    password: {
        type: String,
        required: true
    },
    imgURL: {
        type: String
    },
    applied:{
        type:Boolean,
        default: false
    },
    verified:{
        type:Boolean,
        default: false
    }
});

const User = model('User', userSchema);

export default User;