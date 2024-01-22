import { Schema, model } from "mongoose";

const adminSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

const Admin = model('Admin', adminSchema);

export default Admin;