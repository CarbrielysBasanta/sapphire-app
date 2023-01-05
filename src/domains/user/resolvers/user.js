import { isAuthorized } from "../../../middleware/authorization.js"
import userController from "../controllers/user.js"

const resolvers = {
  Query: {
    hello: isAuthorized,
    login: (root, {data}, context) => {
      return userController.login(data)
    }
  },
  Mutation: {
    saveUser: (root, {data}, context) => {
      return userController.saveUser(data)
    }
  }
}

export default resolvers