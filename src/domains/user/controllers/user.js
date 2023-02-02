import { signToken } from "../../../utils/auth.js";
import { hashPassword, verifyPassword } from "../../../utils/verifyPassword.js";
import UserModel from "../models/user.js";
import { validateData } from "../validations/validations.js";

const userController = {};


userController.saveUser = async (data) => {
  if (data.email == "") throw "email-can't-be-empty"
  if (data.password == "") throw "password-can't-be-empty"
  if (data.password.length < 6) throw "password-can't-less-than-6-characters"
  const hashedPassword = await hashPassword(data.password)
  data.password = hashedPassword
  return await UserModel.create(data)
    .then(res => {
      res.token = signToken({
        userId: data._id,
        role: data.role
      })
      return res
    })
}

userController.login = async (data) => {
  if (data.nickName == "") throw "the-nickname-can't-be-empty"
  if (data.password == "") throw "password-can't-be-empty"
  if (data.password.length < 6) throw "password-can't-less-than-6-characters"
  const user = await UserModel.findOne({ nickName: data.nickName })
    .then((data) => {
      return data
    })
  const isValid = await verifyPassword(user.password, data.password)
  if (!isValid) throw "invalid-password"
  user.token = signToken({
    userId: user._id,
    role: user.role
  })
  return user
}

userController.updateNickname = async (nickname) => {
  return nickname
}

userController.updateUser = async (data) => {
  if (data.email == "") throw "email-can't-be-empty"
  const val = await validateData(data)
  console.log(val);
  return await UserModel.findOne({email: data.email})
  .then(user => {
    return user
  })
  return nickname
}

userController.deleteUser = async (data) => {
  return nickname
}

export default userController