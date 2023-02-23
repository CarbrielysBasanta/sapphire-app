import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  characterId: {
    type: String,
    required: true
  },
  present: {
    type: String,
    required: false,
    default: ""
  },
  past: {
    type: String,
    required: false,
    default: ""
  },
  future: {
    type: String,
    required: false,
    default: ""
  },
},
{
  timestamps: true
})


const HistoryModel = mongoose.model('history', historySchema);
export default HistoryModel;