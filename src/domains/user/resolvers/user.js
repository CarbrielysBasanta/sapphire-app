import userController from "../controllers/user.js"

const resolvers = {
  Query: {
    login: (root, {data}, context) => {
      return userController.login(data)
    }
  },
  Mutation: {
    saveUser: (root, {data}, context) => {
      return userController.saveUser(data)
    },
    updateUser: (root, {data}, context) => {
      return userController.updateUser(data)
    },
    deleteUser: (root, {email, password}, context) => {
      return userController.deleteUser(email, password)
    }
  }
}

export default resolvers