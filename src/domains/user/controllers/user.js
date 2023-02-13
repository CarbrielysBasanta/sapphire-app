import { signToken } from "../../../utils/auth.js";
import { hashPassword, verifyPassword } from "../../../utils/verifyPassword.js";
import UserModel from "../models/user.js";
import { validateData } from "../validations/validations.js";

const userController = {};

userController.saveUser = async (data) => {
  try {
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
      .catch(err => {
        throw err
      })
  }
  catch (err) {
    return err
  }
}

userController.login = async (data) => {
  try {
    if (data.nickName == "" && data.email == "") throw "both-field-can't-be-empty"
    if (data.password == "") throw "password-can't-be-empty"
    if (data.password.length < 6) throw "password-can't-less-than-6-characters"
    const user = await UserModel.findOne({
      $or: [{
        nickName: data.nickName
      },
      { email: data.email }]
    })
      .then((data) => {
        return data
      })
      .catch(err => {
        throw err
      })
    const isValid = await verifyPassword(user.password, data.password)
    if (!isValid) throw "invalid-password"
    user.token = signToken({
      userId: user._id,
      role: user.role
    })
    return user
  }
  catch (err) {
    return err
  }
}

userController.updateNickname = async (nickname) => {
  return nickname
}

userController.updateUser = async (data) => {
  try {
    if (data.email == "") throw "email-can't-be-empty"
    await validateData(data)
    return await UserModel.findById({ _id: data.id })
      .then(user => {
        user.fullName = data.fullName ? data.fullName : user.fullName
        user.nickName = data.nickName ? data.nickName : user.nickName
        user.description = data.description ? data.description : user.description
        user.email = data.email ? data.email : user.email
        user.location = data.location ? data.location : user.location
        return user.save()
      })
      .catch(err => {
        throw err
      })
  }
  catch (err) {
    return err
  }
}

userController.deleteUser = async (email, incomingPassword) => {
  try {
    console.log(email, incomingPassword);
    if (email == "" || incomingPassword == "") throw "some-field-is-be-empty"
    return await UserModel.findOne({ email: email }, { password: 1, email: 1 })
      .then(async (user) => {
        console.log(user);
        if (!user) throw 'user-not-exist'
        const isValid = await verifyPassword(user.password, incomingPassword)
        if (!isValid) throw "invalid-password"
        return await UserModel.findOneAndDelete({ email: email, _id: user.id })
          .then(del => {
            return del
          })
          .catch(err => {
            console.log(`Error deleting user: ${err}`);
            return err
          })
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        throw err
      })
  }
  catch (err) {
    console.log(`Error on deleteUser: ${err}`);
    return err
  }
}

export default userController