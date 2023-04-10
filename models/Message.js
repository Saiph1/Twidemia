import mongoose, { Schema } from "mongoose";
const MessageSchema = new mongoose.Schema(
    {
    message: {
        text: {
            type: String,
            required: true,
        },
    },
        users: Array,
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },

    {
        timestamps: true,
    }
    
);

module.exports = mongoose.models.Messages || mongoose.model("Messages", MessageSchema);
