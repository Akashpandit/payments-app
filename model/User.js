import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    contact: {
        type: String,
        trim: true,
    },

    password: {
        type: String,
        required: true
    },

    description: {
        type: String
    },
    clients: [{ type: mongoose.Types.ObjectId, ref: "Client" }]
});

export default mongoose.model("User", userSchema);