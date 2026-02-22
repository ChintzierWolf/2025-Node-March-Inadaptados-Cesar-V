import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        displayName: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
        },
        hashPassword: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['leader', 'member', 'admin'],
            default: 'member'
        },
        phone: {
            type: String,
            default: null
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;