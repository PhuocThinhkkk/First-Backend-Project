import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../../config/env.js";


const signIn = async (req, res) => {
    const { email, password } = req.body;
   // check if exited user and get it but dont get password
    const user = await User.findOne({
       email
    });
    if (!User) {
        return res.status(401).json({
            success: false,
            message: "User not found"
        });
    }

    const isMatch =  bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid password"
        });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
        success: true,
        message: "Sign in successfully",
        data: {
            user,
            token
        }
    });

}


export default signIn;