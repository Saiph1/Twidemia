// Purpose: Token MongoDB Schema

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const TokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: () => Date.now(),
    required: true,
  },
});

module.exports = mongoose.models.Token || mongoose.model("Token", TokenSchema);
