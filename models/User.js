import mongoose, {Schema} from "mongoose"
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
  username: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    unique: true,
  },
  faculty: {
    type: String,
  },
  year: {
    type: Number,
    required: true,
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
  Description: {
    type: String,
    default: "Hi there, I'm using Twidemia.",
    required: true,
  },
  // Storing other model object as object ID array. 
  followinglist: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  followerlist: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  blocklist: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],

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
