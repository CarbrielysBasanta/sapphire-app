import characterController from "../controllers/characters.js"

const resolvers = {
  Query: {
    getOneCharacter: (root, { characterId }, { credentials }) => {
      const { userId } = credentials
      return characterController.getOneCharacter(characterId, userId)
    },
    getAllCharacters: (root, _, { credentials }) => {
      const { userId } = credentials
      return characterController.getAllCharacters(userId)
    },
    numberOfCharacters: (root, _, { credentials }) => {
      const { userId } = credentials

      return characterController.numberOfCharacters(userId)
    }
  },
  Mutation: {
    createCharacter: (root, { data }, { credentials }) => {
      const { userId } = credentials
      return characterController.createCharacter(data, userId)
    },
    updateCharacter: async (root, { data }, { credentials }) => {
      const { userId } = credentials
      return await characterController.updateCharacter(data, userId).
        then(async (character) => {
          const personality = await characterController.updatePersonality(data, character._id)
          const history = await characterController.updateHistory(data, character._id)
          return {
            character: character,
            personality: personality,
            history: history
          }
        })
    },
    deleteCharacter: (root, { id }, { credentials }) => {
      const { userId } = credentials
      return characterController.deleteCharacter(id, userId)
    }
  }
}

export default resolvers