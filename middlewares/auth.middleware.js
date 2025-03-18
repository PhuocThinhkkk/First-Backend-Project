import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";


const authMiddleware = async (req, res, next) => {
    let token
    try {


        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            console.log(req.headers.authorization);
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token) {
            return res.status(401).json({ message: "unAuthorization, user doesn't have token" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
        console.log(decoded.userId);

        if(!user){
            return res.status(401).json({message: "unAuthorization, user doesn't exist"})
        }
        console.log(user)
        // set user to use id
        req.user = user;

        next();
        
    } catch (error) {
        next(error)

    }
    
};
export default authMiddleware;