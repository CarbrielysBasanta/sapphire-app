import characterController from "../controllers/characters.js"

const resolvers = {
  Query: {
    getOneCharacter: (root, {data}, context) => {
      return characterController.getOneCharacter(data)
    },
    getAllCharacters: (root, _, {credentials}) => {
      const { userId } = credentials
      return characterController.getAllCharacters(userId)
    },
    numberOfCharacters: (root, {data}, context) => {
      return characterController.numberOfCharacters(data)
    }
  },
  Mutation: {
    createCharacter: (root, {data}, {credentials}) => {
      const { userId } = credentials
      return characterController.createCharacter(data, userId)
    },
    updateCharacter: (root, {data}, context) => {
      return characterController.updateCharacter(data)
    },
    deleteCharacter: (root, {data}, context) => {
      return characterController.deleteCharacter(data)
    }
  }
}

export default resolvers