import { validateData } from "../../../validations/validations.js";
import CharacterModel from "../models/characters.js";

const characterController = {};

characterController.createCharacter = async (data, authorId) => {
  try {
    if (!authorId) throw 'userId-not-exist'
    if (data.names == "" || data.role == "" || data.genere == "") throw "some-fields-are-empty"
    data.authorId = authorId
    return CharacterModel.create(data)
    .then(character => {
      return character
    })
    .catch(err => {
      console.log(`Error creating character: ${err}`);
      throw err
    })
  }
  catch (err) {
    console.log(`Error on createCharacter: ${err}`);
    throw err
  }
}

characterController.updateCharacter = async (data) => {
  try {
    // if (data.email == "") throw "email-can't-be-empty"
    const valid = await validateData(data, 'Character')
    if (valid.error) throw `an-error-ocurred: ${valid.msg}` 
    return await CharacterModel.findById({ _id: data.id })
      .then(character => {
        console.log(character);
        if (data.names) character.names = data.names
        if (data.lastNames) character.lastNames = data.lastNames
        if (data.nickname) character.nickname = data.nickname
        if (data.age) character.age = data.age
        if (data.dateOfBorn) character.dateOfBorn = data.dateOfBorn
        if (data.role) character.role = data.role
        if (data.appearance.hair) character.appearance.hair = data.appearance.hair
        if (data.appearance.eyes) character.appearance.eyes = data.appearance.eyes
        if (data.appearance.skin) character.appearance.skin = data.appearance.skin
        if (data.genere) character.genere = data.genere
        if (data.race) character.race = data.race
        if (data.powers) character.powers = data.powers
        if (data.skills) character.skills = data.skills
        if (data.location.world) character.location.world = data.location.world
        if (data.location.city) character.location.city = data.location.city
        return character.save()
      })
      .catch(err => {
        throw err
      })
  }
  catch (err) {
    console.log(`Error on updateCharacter: ${err}`);
    throw err
  }
}

characterController.deleteCharacter = async () => {
  try {

  }
  catch (err) {
    return err
  }
}

characterController.getAllCharacters = async (userId) => {
  try {
    if (userId === "") throw "user-can't-be-empty"
    return CharacterModel.find({authorId: userId})
    .then(characters => {
      if (characters == []) throw "there's-not-characters-yet"
      return characters
    })
    .catch(err => {
      throw err
    })
  }
  catch (err) {
    throw err
  }
}

characterController.getOneCharacter = async () => {
  try {
  
  }
  catch (err) {
    return err
  }
}

characterController.numberOfCharacters = async () => {
  try {

  }
  catch (err) {
    return err
  }
}

export default characterController