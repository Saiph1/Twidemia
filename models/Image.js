// Purpose: Image MongoDB Schema

import mongoose, { Schema } from "mongoose";
const ImageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.models.Image || mongoose.model("Image", ImageSchema);
