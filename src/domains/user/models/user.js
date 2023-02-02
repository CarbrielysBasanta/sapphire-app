import mongoose from "mongoose";

const roleEnum = [
  'User',
  'Admin'
]

//Social media schema
const socialMediaSchema = new mongoose.Schema({
  facebook: {
    type: String,
    required: false,
    default: ""
  }
})

//Principal schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  nickName: {
    type: String,
    required: false,
    default: ""
  },
  description: {
    type: String,
    required: false,
    default: ""
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'User',
    enum: roleEnum
  },
  dateOfBorn: {
    type: Date,
    required: false,
    default: ""
  },
  location: {
    type: String,
    required: false,
    default: ""
  },
  genere: {
    type: String,
    required: false,
    default: ""
  },
  socialMedia: {
    type: socialMediaSchema,
    default: {}
  },
  lastConnection: {
    type: Date,
    required: false,
    default: ""
  }
}, {
  timestamps: true
});

const UserModel = mongoose.model('user', userSchema);
export default UserModel;