import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    name:       { type: String, required: true },
  firstName:    { type: String, required: true },
  lastName:     { type: String, required: true },
  email:        { type: String, required: true },
  contact:      { type: Number, required: true },
  phone:        { type: Number, required: true },
  content:      { type: String, required: true }
}, {
  timestamps: true
});

export const Feedback = mongoose.model('Feedback',feedbackSchema); 
