import mongoose from "mongoose";

const personalitySchema = new mongoose.Schema({
  characterId: {
    type: String,
    required: true
  },
  adjetives: {
    type: String,
    required: false,
    default: ""
  },
  fears: {
    type: String,
    required: false,
    default: ""
  },
  dreams: {
    type: String,
    required: false,
    default: ""
  },
  craze: {
    type: String,
    required: false,
    default: ""
  },
  sexualOrientation: {
    type: String,
    required: false,
    default: ""
  },
  likes:{
    type: String,
    required: false,
    default: ""
  },
  dislikes: {
    type: String,
    required: false,
    default: ""
  }
},
{
  timestamps: true
})


const PersonalityModel = mongoose.model('personality', personalitySchema);
export default PersonalityModel;