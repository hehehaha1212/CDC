import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  teamName:           { type: String, required: true },
  maxMembers:         { type: Number, default: 3 },
  event: {
    eventId:          { type: Number, required: true },
    isRegistered:     { type: Boolean, default: false },
    score:            { type: Number, default: 0 }
  },
  members: [{
    userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User',  required: true },
    role:     { type: String, enum: ["member", "leader"], default: "member" },
    joinedAt: { type: Date, default: Date.now }
  }],
}, {
  timestamps: true
});

export const Team = mongoose.model('Team',teamSchema)
