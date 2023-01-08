import userController from "../controllers/user.js"

const resolvers = {
  Query: {
    hello: () => {
      return userController.sayHello()
    },
    login: (root, {data}, context) => {
      return userController.login(data)
    }
  },
  Mutation: {
    saveUser: (root, {data}, context) => {
      return userController.saveUser(data)
    },
    updateNickname: (root, {nickname}, context) => {
      // console.log(context);
      return userController.updateNickname(nickname)
    }
  }
}

export default resolvers