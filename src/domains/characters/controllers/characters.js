import mongoose from "mongoose";
import { validateData } from "../../../validations/validations.js";
import CharacterModel from "../models/characters.js";
import HistoryModel from "../models/history.js";
import PersonalityModel from "../models/personality.js";
import RelationModel from "../models/relation.js";

const characterController = {};

characterController.createCharacter = async (data, authorId) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (!authorId) throw 'userId-not-exist'
    if (data.character.names == "" || data.character.role == "") throw "some-fields-are-empty"
    const valid = await validateData(data, 'Character')
    if (valid.error) throw `an-error-ocurred: ${valid.msg}`
    data.character.authorId = authorId
    return await CharacterModel.create([data.character], { session })
      .then(async (character) => {
        data.personality.characterId = character[0]._id
        data.relation.characterId = character[0]._id
        data.history.characterId = character[0]._id
        const personality = await PersonalityModel.create([data.personality], { session })
        const history = await HistoryModel.create([data.history], { session });
        const relation = await RelationModel.create([data.relation], { session });
        await session.commitTransaction();
        session.endSession();
        return {
          character: character[0],
          relation: relation[0],
          history: history[0],
          personality: personality[0],
        }
      })
      .catch(async (err) => {
        console.log(err);
        await session.abortTransaction();
        session.endSession();
        throw err;
      });
  }
  catch (err) {
    throw err
  }
}

characterController.updateCharacter = async (data, authorId) => {
  try {
    console.log(data.character.id, authorId);
    const valid = await validateData(data, 'UpdateCharacter')
    if (valid.error) throw `an-error-ocurred: ${valid.msg}`
    return await CharacterModel.findById({ _id: data.character.id, authorId: authorId })
      .then(character => {
        if (!character) throw 'character-not-exist'
        console.log(character);
        if (data.character.names) character.names = data.character.names
        if (data.character.lastNames) character.lastNames = data.character.lastNames
        if (data.character.nickname) character.nickname = data.character.nickname
        if (data.character.age) character.age = data.character.age
        if (data.character.dateOfBorn) character.dateOfBorn = data.character.dateOfBorn
        if (data.character.role) character.role = data.character.role
        if (data.character.appearance.hair) character.appearance.hair = data.character.appearance.hair
        if (data.character.appearance.eyes) character.appearance.eyes = data.character.appearance.eyes
        if (data.character.appearance.skin) character.appearance.skin = data.character.appearance.skin
        if (data.character.genere) character.genere = data.character.genere
        if (data.character.race) character.race = data.character.race
        if (data.character.powers) character.powers = data.character.powers
        if (data.character.skills) character.skills = data.character.skills
        if (data.character.location.world) character.location.world = data.character.location.world
        if (data.character.location.city) character.location.city = data.character.location.city
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

characterController.updatePersonality = async (data, characterId) => {
  try {
    console.log('a');
    const valid = await validateData(data, 'UpdatePersonality')
    if (valid.error) throw `an-error-ocurred: ${valid.msg}`
    return await PersonalityModel.findOne({ characterId: characterId })
      .then(personality => {
        if (data.personality.adjetives) personality.adjetives = data.personality.adjetives
        if (data.personality.fears) personality.fears = data.personality.fears
        if (data.personality.dreams) personality.dreams = data.personality.dreams
        if (data.personality.craze) personality.craze = data.personality.craze
        if (data.personality.sexualOrientation) personality.sexualOrientation = data.personality.sexualOrientation
        if (data.personality.likes) personality.likes = data.personality.likes
        if (data.personality.dislikes) personality.dislikes = data.personality.dislikes
        return personality.save()
      })
      .catch(err => {
        throw err
      })
  }
  catch (err) {
    console.log(`Error on updatePersonality: ${err}`);
    throw err
  }
}

characterController.updateHistory = async (data, characterId) => {
  try {
    console.log('b');
    const valid = await validateData(data, 'UpdateHistory')
    if (valid.error) throw `an-error-ocurred: ${valid.msg}`
    return await HistoryModel.findOne({ characterId: characterId })
      .then(history => {
        if (data.history.present) history.present = data.history.present
        if (data.history.past) history.past = data.history.past
        if (data.history.future) history.future = data.history.future
        return history.save()
      })
      .catch(err => {
        throw err
      })
  }
  catch (err) {
    console.log(`Error on updateHistory: ${err}`);
    throw err
  }
}

characterController.deleteCharacter = async (id, authorId) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (!authorId) throw 'userId-not-exist'
    const character = await CharacterModel.findOneAndDelete([{ _id: id, authorId: authorId }], { session })
    const personality = await PersonalityModel.findOneAndDelete([{ characterId: id }], { session })
    const history = await HistoryModel.findOneAndDelete([{ characterId: id }], { session });
    const relation = await RelationModel.findOneAndDelete([{ characterId: id }], { session });
    await session.commitTransaction();
    session.endSession();
    return `Personaje "${character.names}" ha sido eliminado`
  }
  catch (err) {
    return err
  }
}

characterController.getAllCharacters = async (authorId) => {
  try {
    if (authorId === "") throw "user-can't-be-empty"
    return CharacterModel.find({ authorId: authorId })
      .then(characters => {
        if (characters.length == 0) throw "there's-not-characters-yet"
        return characters
      })
      .catch(err => {
        throw err
      })
  }
  catch (err) {
    console.log(`Error on updateHistory: ${err}`);
    throw err
  }
}

characterController.getOneCharacter = async (characterId, authorId) => {
  try {
    if (authorId === "" || characterId === "") throw "these-fields-can't-be-empty"
    return CharacterModel.findOne({_id: characterId, authorId: authorId})
    .then(character => {
      const personality = PersonalityModel.findOne({characterId: characterId})
      const history = HistoryModel.findOne({characterId: characterId})
      const relation = RelationModel.findOne({characterId: characterId})
      return {
        character: character,
        relation: relation,
        history: history,
        personality: personality,
      }
    })
  }
  catch (err) {
    return err
  }
}

characterController.numberOfCharacters = async (authorId) => {
  try {
    if (authorId === "") throw "user-can't-be-empty"
    return CharacterModel.find({ authorId: authorId }).count()
      .then(characters => {
        return characters
      })
      .catch(err => {
        throw err
      })
  }
  catch (err) {
    return err
  }
}

export default characterController