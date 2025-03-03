import  mongoose  from "mongoose"
import bcrypt from "bcryptjs"
import User from "../../models/user.model.js" 
import { JWT_SECRET, JWT_EXPIRES_IN } from "../../config/env.js"
import jwt from "jsonwebtoken"




const signUp = async ( req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password } = req.body;
        const exitedUser = await User.findOne({ email });
        if (exitedUser) {
            await session.abortTransaction();
            session.endSession();
            return next(new Error('User already exists'));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{
            name,
            email,
            password: hashedPassword

        }],{ session });
        const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        await session.commitTransaction();
        session.endSession();
        
        res.status(201).json({ 
            susscess: true,
            message: 'create user successfully',
            data: {
                user: newUser[0],
                token
            },
        });
       
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
export default signUp;