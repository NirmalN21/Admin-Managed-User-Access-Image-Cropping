import bcrypt from "bcryptjs"
import Admin from "./models/adminSchema.js";

export const initializeAdmin = async () => {
    try {

        const existingAdmins = await Admin.find();
        if (existingAdmins.length === 0) {

            const userId = 9999;
            const password = 'nirmal@dev';

            const hashedPassword = await bcrypt.hash(password, 10);

            const newAdmin = new Admin({
                userId,
                password: hashedPassword,
            });

            await newAdmin.save();

            console.log('Admin account initialized successfully.');
        } else {
            console.log('Admin account(s) already exist.');
        }

    } catch (error) {
        console.error('Error initializing admin account:', error);
    }
};