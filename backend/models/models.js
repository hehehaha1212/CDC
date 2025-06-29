import mongoose from "mongoose";

export const User = new mongoose.Schema({
  username:       { type: String, required: true },
  email:          { type: String, unique: true, required: true },
  password:       { type: String, required: true },
  phone:          { type: Number, unique: true },
  college:        { type: String },
  rollno:         { type: Number, unique: true },
  isActive:       { type: Boolean, default: true },
  role: {
    type: String,
    enum: ["user", "admin", "member"],
    default: "user"
  },
  eventProfile:    {
    codeforcesId: { type: String, unique: true, sparse: true },
    eventRole:    { type: String, enum: ["member","leader"], default: "member" }
  }
}, {
  timestamps: true
});

export const Member = new mongoose.Schema ({
  _id: mongoose.Schema.Types.ObjectId,
  membername:      { type: String, unique: true, required: true },
  memberbatch:     { type: Number, required: true },
  memberimage:     [String],
  memberbio:       { type: String },
  memberrole:      { type: String, required: true },
  membersocial_links: {
    linkedin:      [String],
    github:        [String],
    email:         [String]
  },
});

export const Team = new mongoose.Schema({
  teamName:           { type: String, required: true },
  event: {
    eventId:          { type: Number, required: true },
    isRegistered:     { type: Boolean, default: false },
    score:            { type: Number, default: 0 }
  },
  members: [{
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    role: { 
      type: String, 
      enum: ["member", "leader"], 
      default: "member" 
    },
    joinedAt: { type: Date, default: Date.now }
  }],
  maxMembers:         { type: Number, default: 3 },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, {
  timestamps: true
});

export const Event = new mongoose.Schema({
  Year:         { type: Number, required: true },
  EventName:    { type: String, required: true },
  Description:  { type: String, required: true },
  participants: { type: Number },
  Winners:      [{ type: mongoose.Schema.Types.ObjectId }]
}, {
  timestamps: true
});

export const Feedback = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  contact: { type: Number, required: true },
  content: { type: String, required: true }
}, {
  timestamps: true
});

export const Blog = new mongoose.Schema({
  _id:         mongoose.Schema.Types.ObjectId,
  title:       { type: String, required: true },
  content:     { type: String, required: true },
  author:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  images:      [String], 
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date }
});

/*roadmap{
  domain_name: string
  phase1{
    topic
    link:
    link:
    link:
  }
     phase12{
    topic
    link:
    link:
    link:
  }
     phase3{
    topic
    link:
    link:
    link:
  } 
    phase4{
    topic
    link:
    link:
    link:
  } 
    phase5{
    topic
    link:
    link:
    link:

  }
} */