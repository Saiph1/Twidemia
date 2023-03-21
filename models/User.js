import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: String,
  userId: {
    type: String,
    unique: true,
  },
  createdDate: {
    type: Date,
    default: () => Date.now(),
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

// hash password if password is changed
UserSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 12, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
