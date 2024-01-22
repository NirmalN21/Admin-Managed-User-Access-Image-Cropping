import bcrypt from "bcryptjs";
import User from "../models/userSchema.js";
import Admin from "../models/adminSchema.js";

export const home = async function (req, res) {

    res.render("login");

}

export const adminLogin = async (req, res) => {
    try {
        const { userId, password } = req.body;

        if (!userId || !password) {
            return res.status(422).json({ error: "Please fill all the required fields!!!" });
        }
        const findUser = await Admin.findOne({ userId: userId });

        if (!findUser) {
            return res.status(401).json({ error: "Invalid Credentials!!!" });
        } else {

            const isMatch = await bcrypt.compare(password, findUser.password);

            if (isMatch) {
                return res.status(200).json({ Message: "Logged in" });
            } else {
                return res.status(401).json({ error: "Invalid Credentials!!!" });
            }
        }
    } catch (err) {
        console.log(err);
    }

}

export const getCreateUser = async (req, res) => {

    const users = await User.find({});

    res.render("createUser", { users: users });

}

export const postCreateUser = async (req, res) => {

    try {
        const { userId, password } = req.body;

        if (!userId || !password) {
            return res.status(422).json({ error: "Please fill all the required fields!!!" });
        }
        const findUser = await User.findOne({ userId: userId });

        if (findUser) {
            return res.status(401).json({ error: "User already exists!!!" });
        } else {
            const hash = await bcrypt.hash(password, 12);

            const user = new User({ userId, password: hash });

            await user.save();

            return res.status(200).json({ error: "User created successfully!!!" });
        }
    } catch (err) {
        console.log(err);
    }
}

export const viewUser = async (req, res) => {

    const users = await User.find({});

    res.render("viewUser", { users: users });
}

export const verifyUser = async (req, res) => {
    try {
        const userId = req.body.userId;

        const findUser = await User.findOneAndUpdate({ userId: userId }, { verified: true })

        if (!findUser) {
            return res.status(401).json({ error: "Invalid Credentials!!!" });
        } else {
            return res.status(200).json({ message: "User updated Successfuly!!!" });
        }

    } catch (error) {
        console.log(error);

    }
}

export const resetUser = async (req, res) => {
    try {
        const userId = req.body.userId;

        const findUser = await User.findOneAndUpdate({ userId: userId }, { applied: false, img: "", verified: false })

        if (!findUser) {
            return res.status(401).json({ error: "Invalid Credentials!!!" });
        } else {
            return res.status(200).json({ message: "User updated Successfuly!!!" });
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.body.userId;

        const findUser = await User.findOneAndDelete({ userId: userId });

        if (!findUser) {
            return res.status(401).json({ error: "Invalid Credentials!!!" });
        } else {
            return res.status(200).json({ message: "User updated Successfuly!!!" });
        }
    } catch (error) {
        console.log(error);
    }
}