import mongoose from "mongoose";

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    contact: {
        type: String,
        trim: true,
    },
    area: {
        type: String
    },
    description: {
        type: String
    },
    payments: [{ type: mongoose.Types.ObjectId, ref: "Payment" }],
    totalSent: {
        type: Number
    },
    totalReceived: {
        type: Number
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export default mongoose.model("Client", clientSchema);