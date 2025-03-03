import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, "user name is requiredko"],
        strim: true,
        minLength: [ 3, "user name must be at least 3 characters long"],
        maxLength: [ 50, "user name must be at most 50 characters long"],
    },
    email: {
        type: String,
        required: [ true, "email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [ /^\S+@\S+\.\S+$/, "please enter a valid email address"],
    },
    password: {
        type: String,
        required: [ true, "password is required"],
        minLength: [ 6, "password must be at least 6 characters long"],
    }
}
, {
    timestamps: true 
});

const User = mongoose.model("User", userSchema);

export default User;