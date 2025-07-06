import mongoose from "mongoose";

const memberSchema = new mongoose.Schema ({
  memberName:      { type: String, unique: true, required: true },
  memberYear:      { type: Number, required: true },
  memberImage:     [String],
  memberBio:       { type: String },
  memberRole:      { type: String, required: true },
  memberSocial:    {
    linkedin:      [String],
    github:        [String],
    email:         [String]
  },
});

export const Member = mongoose.model('Member',memberSchema);

