import { signToken } from "../../../utils/auth.js";
import { hashPassword, verifyPassword } from "../../../utils/verifyPassword.js";
import UserModel from "../models/user.js";

const userController = {};

userController.sayHello = async () => {
  console.log('Hello, world');
  return 'Its a brand new day, good morning, world'
}

userController.saveUser = async (data) => {
  const hashedPassword = await hashPassword(data.password)
  data.password = hashedPassword
  return await UserModel.create(data)
    .then(res => {
      res.token = signToken({ userId: res._id })
      return res
    })
}

userController.login = async (data) => {
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

export default userController