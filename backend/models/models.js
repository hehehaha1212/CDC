import mongoose from "mongoose";

export const user = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username:       { type: String, unique: true, required: true },
  email:          { type: String, unique: true, required: true },
  password:       { type: String, required: true },
  phone:          { type: Number},
  college:        { type: string},
  rollno :        { type: number},
  isActive:       { type: Boolean, default: true },
  teamname:       { type: String },
  role:           {
    type: String,
    enum: ["user","admin","member"],
    default: "user"   // All new users are normal users by default
  },
  eventprofile:  {
    username:          { type: String },
    codeforceID:       { type: String },
    role:              { type: String, enum: ["member", "leader"], default: "member" }
  }
});

export const member = new mongoose.schema ({
  _id:mongoose.Schema.Types.ObjectId,
  membername:         { type: String, unique: true, required:true},
  memberbatch:        { type: Number, required:true},
  memberimage:        [ String],
  memberbio:          { type : string},
  memberrole:         { type :String, required: true},
  membersocial_links: {
    linkedin:          [ String],
    github:            [ String],
    email:             [ String]
  },
});

export const team = new mongoose.schema({
  _id:mongoose.schema.Types.ObjectId,
  team_name:            { type:string, required:true},
  event:{
    event_id:           { type :number,   required:true},
    registeration:      { type : Boolean, required:true},
    score:              { type :number,   required:true}
  },
  member:{
    member1: {
    Name:               { type :string, required:true},
    Email:              { type: string, unique:true, required:true},
    Phone:              { type :number, unique:true, required:true},
    Roll_No:            { type: number, unique:true, required:true},
    Codeforces_Id:      { type: string, unique:true, required: true},
    team_role:          { type:string,  required:true},
   },
    member2: {
    Name:               { type :string, required:true},
    Email:              { type: string, unique:true, required:true},
    Phone:              { type :number, unique:true, required:true},
    Roll_No:            { type: number, unique:true, required:true},
    Codeforces_Id:      { type: string, unique:true, required: true},
    teamrole:          { type:string,  required:true},
   },
    member3: {
    Name:               { type :string, required:true},
    Email:              { type: string, unique:true, required:true},
    Phone:              { type :number, unique:true, required:true},
    RollNo:            { type: number, unique:true, required:true},
    CodeforcesId:      { type: string, unique:true, required: true},
    teamrole:          { type:string,  required:true},
   }
  },

});
 export const event = new mongoose.schema({
  Year:           { type:number, required:true},
  EventName:     { type:string, required:true},
  Description:    { type:string, required:true},
  participants:   { type:number},
  Winners:          [Array], //will hold team name
  About:{
    //things
  }
});

export const feedback = new mongoose.schema({
  name:           { type:string, required:true},
  email:          { type:string, required:true},
  contact:        { type:number, required:true},
  content :       { type:string, required:true},
  timestamps:     { 
    createdAt: 'created_at' 
  }
});

export const Blog = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title:        { type: String, required: true },
  content:      { type: String, required: true },
  author:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  images:       [ String], 
  isPublished:  { type: Boolean, default: false },
  publishedAt:  { type: Date },
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