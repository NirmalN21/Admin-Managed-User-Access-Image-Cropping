import multer from "multer";
import bcrypt from "bcryptjs";
import User from "../models/userSchema.js";

export const userLogin = async (req, res) => {
    try {
        const { userId, password } = req.body;

        if (!userId || !password) {
            return res.status(422).json({ error: "Please fill all the required fields!!!" });
        }
        const findUser = await User.findOne({ userId: userId });

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


export const userDetails = async function (req, res) {

    const userId = req.params.userId;

    const foundUser = await User.findOne({ userId: userId });

    res.render("updateProfile", { foundUser: foundUser });

}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/uploads/");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
})

export const upload = multer({ storage: storage });

export const uploadImage = async function (req, res) {

    const username = req.body.username;
    const userId = req.body.userId;
    const imagePath = req.file.filename;

    const findUser = await User.findOneAndUpdate({ userId: userId }, { username: username, imgURL: imagePath, applied: true });

    if (!findUser) {
        return res.status(401).json({ error: "Invalid Credentials!!!" });
    } else {
        return res.status(200).json({ message: "User updated Successfuly!!!" });
    }

}