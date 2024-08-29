import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        default: "GENERAL",
    },
}, {
    timestamps: true
});

const userModer = mongoose.model("user", userSchema);

export default userModer;

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    profileImage?: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
}