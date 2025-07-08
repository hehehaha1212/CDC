import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username:       { type: String, required: true },
  email:          { type: String, unique: true, required: true },
  password:       { type: String, required: true },
  phone:          { type: Number, unique: true, sparse: true },
  college:        { type: String },
  rollno:         { type: Number, unique: true,sparse: true },
  isActive:       { type: Boolean, default: true },
  teadID:         { type: mongoose.Schema.Types.ObjectId},
  role: {
    type: String,
    enum: ["user", "admin", "member"],
    default: "user"
  },
  eventProfile:    {
    codeforcesId: { type: String, unique: true, sparse: true },
    eventRole:    { type: String, enum: ["teammember","leader"], default: "teammember" }
  }
}, {
  timestamps: true
});

export const User = mongoose.model('User',userSchema);
