import worldsController from "../controllers/worlds.js"

const resolvers = {
  Query: {
    getOneTerritory: (root, { worldId }, { credentials }) => {
      const { userId } = credentials
      return worldsController.getOneTerritory(worldId, userId)
    },
    getAllTerritories: (root, _, { credentials }) => {
      const { userId } = credentials
      return worldsController.getAllTerritories(userId)
    },
    numberOfTerritories: (root, _, { credentials }) => {
      const { userId } = credentials
      return worldsController.numberOfTerritories(userId)
    }
  },
  Mutation: {
    createTerritory: (root, { data }, { credentials }) => {
      const { userId } = credentials
      return worldsController.createTerritory(data, userId)
    },
    updateTerritory: (root, { data }, { credentials }) => {
      const { userId } = credentials
      return worldsController.updateTerritory(data, userId)
    },
    deleteTerritory: (root, { id }, { credentials }) => {
      const { userId } = credentials
      return worldsController.deleteTerritory(id, userId)
    },
  }
}

export default resolvers