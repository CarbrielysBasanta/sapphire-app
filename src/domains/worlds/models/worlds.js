import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
  educational: {
    type: String,
    default: ""
  },
  technological: {
    type: String,
    default: ""
  },
  medicinal: {
    type: String,
    default: ""
  }
})

const territoriesSchema = new mongoose.Schema({
  territoryName: {
    type: String,
    default: ""
  },
  territoryType: {
    type: String,
    default: ""
  },
  territoryId: {
    type: String,
    default: ""
  }
})

const ethnicitySchema = new mongoose.Schema({
  ethnicityName: {
    type: String,
    default: ""
  },
  ethnicityAbility: {
    type: String,
    default: ""
  },
  isMagical: {
    type: Boolean,
    default: ""
  }
})

//Principal schema
const worldSchema = new mongoose.Schema({
  authorId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  peopleName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: ""
  },
  epoch: {
    type: String,
    default: ""
  },
  government: {
    type: String,
    default: ""
  },
  leader: {
    type: String,
    default: ""
  },
  economy: {
    type: String,
    default: ""
  },
  history: {
    type: String,
    default: ""
  },
  fauna: {
    type: String,
    default: ""
  },
  flora: {
    type: String,
    default: ""
  },
  weather: {
    type: String,
    default: ""
  },
  level: {
    type: levelSchema,
    default: {}
  },
  associatedTerritories: {
    type: [territoriesSchema],
    default: []
  },
  ethnicity: {
    type: ethnicitySchema,
    default: {}
  }
}, {
  timestamps: true
});

const WorldModel = mongoose.model('world', worldSchema);
export default WorldModel;