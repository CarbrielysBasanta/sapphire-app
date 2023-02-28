import { validateData } from "../../../validations/validations.js";
import WorldModel from "../models/worlds.js";

const worldsController = {};

worldsController.createTerritory = async (data, authorId) => {
  try {
    if (authorId == "") throw "authorId-can't-be-empty"
    if (data.name == "" || data.type == "") throw "these-fields-can't-be-empty"
    const valid = await validateData(data, 'World')
    if (valid.error) throw `an-error-ocurred: ${valid.msg}`
    data.authorId = authorId
    return await WorldModel.create(data)
      .then(world => {
        if (!world) throw "world-can't-be-created"
        return world
      })
      .catch(err => {
        throw err
      })
  }
  catch (err) {
    console.log(`Error on createTerritory: ${err}`);
    throw err
  }
}

worldsController.updateTerritory = async (data, authorId) => {
  try {
    console.log(data, authorId);
    const valid = await validateData(data, 'World')
    if (valid.error) throw `an-error-ocurred: ${valid.msg}`
    return await WorldModel.findById({ _id: data.id, authorId: authorId })
      .then(world => {
        console.log(world);
        if (!world) throw 'world-not-exist'
        if (data.name) world.name = data.name
        if (data.peopleName) world.peopleName = data.peopleName
        if (data.type) world.type = data.type
        if (data.epoch) world.epoch = data.epoch
        if (data.goverment) world.goverment = data.goverment
        if (data.leader) world.leader = data.leader
        if (data.economy) world.economy = data.economy
        if (data.history) world.history = data.history
        if (data.fauna) world.fauna = data.fauna
        if (data.flora) world.flora = data.flora
        if (data.weather) world.weather = data.weather
        if (data.ethnicity.ethnicityName) world.ethnicity.ethnicityName = data.ethnicity.ethnicityName
        if (data.ethnicity.ethnicityAbility) world.ethnicity.ethnicityAbility = data.ethnicity.ethnicityAbility
        if (data.ethnicity.isMagical) world.ethnicity.isMagical = data.ethnicity.isMagical
        if (data.level.educational) world.level.educational = data.level.educational
        if (data.level.technological) world.level.technological = data.level.technological
        if (data.level.medicinal) world.level.medicinal = data.level.medicinal
        return world.save()
      })
      .catch(err => {
        throw err
      })
  }
  catch (err) {
    console.log(`Error on updateTerritory: ${err}`);
    throw err
  }
}

worldsController.deleteTerritory = async (id, authorId) => {
  try {
    if (!authorId) throw 'userId-not-exist'
    return await WorldModel.findOneAndDelete({_id: id, authorId: authorId })
    .then(world => {
      if(!world) throw 'territory-not-found'
      return `Territorio "${world.name}" ha sido eliminado`
    })
    .catch(err => {
      throw err
    });
  }
  catch(err) {
    console.log(`Error on deleteTerritory: ${err}`);
    throw err
  }
}

worldsController.getAllTerritories = async (authorId) => {
  try {
    if (authorId === "") throw "user-can't-be-empty"
    return WorldModel.find({ authorId: authorId })
      .then(worlds => {
        if (worlds.length == 0) throw "there's-nots-yet"
        return worlds
      })
      .catch(err => {
        throw err
      })
  }
  catch (err) {
    console.log(`Error on getAllTerritories: ${err}`);
    throw err
  }
}

worldsController.getOneTerritory = async (worldId, authorId) => {
  try {
    if (authorId === "" || worldId === "") throw "these-fields-can't-be-empty"
    return WorldModel.findOne({ _id: worldId, authorId: authorId })
      .then(world => {
        return world
      })
  }
  catch (err) {
    console.log(`Error on getOneTerritory: ${err}`);
    return err
  }
}

worldsController.numberOfTerritories = async (authorId) => {
  try {
    if (authorId === "") throw "user-can't-be-empty"
    return WorldModel.find({ authorId: authorId }).count()
      .then(worlds => {
        return worlds
      })
      .catch(err => {
        throw err
      })
  }
  catch (err) {
    console.log(`Error on numberOfTerritories: ${err}`);
    return err
  }
}

export default worldsController