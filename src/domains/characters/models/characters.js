import mongoose from "mongoose";

//apperance schema
const appearanceSchema = new mongoose.Schema({
  hair: {
    type: String,
    required: false,
    default: ""
  },
  eyes: {
    type: String,
    required: false,
    default: ""
  },
  skin: {
    type: String,
    required: false,
    default: ""
  }
})

//location schema
const locationSchema = new mongoose.Schema({
  world: {
    type: String,
    required: false,
    default: ""
  },
  city: {
    type: String,
    required: false,
    default: ""
  },
  worldId: {
    type: String,
    required: false,
    default: ""
  }
})

//Principal schema
const characterSchema = new mongoose.Schema({
  authorId: {
    type: String,
    required: true
  },
  names: {
    type: String,
    required: true
  },
  lastNames: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: false,
    default: ""
  },
  age: {
    type: Number,
    required: false,
    default: undefined
  },
  dateOfBorn: {
    type: Date,
    required: false,
    default: ""
  },
  role: {
    type: String,
    required: true
  },
  appearance: {
    type: appearanceSchema,
    default: {}
  },
  genere: {
    type: String,
    required: false,
    default: ""
  },
  race: {
    type: String,
    required: false,
    default: ""
  },
  powers: {
    type: String,
    required: false,
    default: ""
  },
  skills: {
    type: String,
    required: false,
    default: ""
  },
  range: {
    type: String,
    required: false,
    default: ""
  },
  location: {
    type: locationSchema,
    default: {}
  }
}, {
  timestamps: true
});

const CharacterModel = mongoose.model('character', characterSchema);
export default CharacterModel;