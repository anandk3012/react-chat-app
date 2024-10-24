import { genSalt } from "bcrypt";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'

// This creates a new schema/table in mongoDB with the userData
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    color: {
        type: Number,
        required: false,
    },
    profileSetup: {
        type: Boolean,
        default: false,
    },

});

// Before saving the user data we have to run this middleware to encrypt the users password
userSchema.pre("save" , async function (next){
    const salt = await genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model("Users", userSchema);

export default User;

