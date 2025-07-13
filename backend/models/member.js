import mongoose from "mongoose";

const memberSchema = new mongoose.Schema ({
  memberName:      { type: String },
  memberEmail:     { type: String, },
  memberYear:      { type: Number,},
  memberImage:     [ String],
  memberBio:       { type: String },
  memberRole:      { type: String,  },
  memberSocial:    {
    linkedin:      [String],
    github:        [String]
  },
});

export const Member = mongoose.model('Member',memberSchema);

