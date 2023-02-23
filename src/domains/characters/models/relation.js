import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    default: ""
  },
  age: {
    type: Number,
    required: false,
    default: 0
  },
  relation: {
    type: String,
    required: false,
    default: ""
  }
})

const relationSchema = new mongoose.Schema({
  characterId: {
    type: String,
    required: true
  },
  family: {
    type: [personSchema]
  },
  friends: {
    type: [personSchema]
  },
  enemy: {
    type: [personSchema]
  },
  lover: {
    type: [personSchema]
},
},
{
  timestamps: true
})


const RelationModel = mongoose.model('relation', relationSchema);
export default RelationModel;