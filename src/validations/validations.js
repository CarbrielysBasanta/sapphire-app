import config from "../config/config.js"

const Alphabetic = /^[a-zA-Z\u00C0-\u017F]+$/
const Numeric = /^[0-9]+$/
const Alphanumeric = /^[0-9a-zA-Z\u00C0-\u017F]+$/
const AlphanumericAndSpecials = /^[a-zA-Z0-9\s\!\@\#\$\%\^\&\*\(\)\-\+\=\{\}\[\]\;\:\'\"\,\&#60;\.\&#62;\/\?]+$/
const AlphaAndSpecials = /^[a-zA-Z\u00C0-\u017F\s\!\@\#\$\%\^\&\*\(\)\-\+\=\{\}\[\]\;\:\'\"\,\&#60;\.\&#62;\/\?]+$/

export const validateData = (data, origin) => {
  try {
    let dataToValidate
    if (origin == 'User') {
      dataToValidate = [
        { name: "fullName", value: data.fullName, limitString: 30, regex: Alphabetic },
        { name: "nickName", value: data.nickName, limitString: 30, regex: AlphanumericAndSpecials },
        { name: "description", value: data.description, limitString: 30, regex: Alphanumeric },
        // {name:"email", value: data.email, limitString: 30, regex:  AlphanumericAndSpecials},
        { name: "location", value: data.location, limitString: 30, regex: Alphabetic },
        // {name:"facebook", value: data.socialMedia.facebook, limitString: 30, regex:  Alphanumeric}
      ]
    } else if (origin == 'Character') {
      console.log('HERE');
      dataToValidate = [
        { name: "names", value: data.character.names, limitString: 30, regex: AlphaAndSpecials },
        { name: "lastNames", value: data.character.lastNames, limitString: 30, regex: AlphaAndSpecials },
        { name: "dateOfBorn", value: data.character.dateOfBorn, limitString: 30, regex: AlphanumericAndSpecials },
        { name: "skill", value: data.character.skill, limitString: 30, regex: Alphabetic },
        { name: "role", value: data.character.role, limitString: 30, regex: Alphabetic },
        { name: "range", value: data.character.range, limitString: 30, regex: Alphabetic },
        { name: "race", value: data.character.race, limitString: 30, regex: Alphabetic },
        { name: "power", value: data.character.power, limitString: 60, regex: AlphaAndSpecials },
        { name: "genere", value: data.character.genere, limitString: 30, regex: Alphabetic },
        { name: "age", value: data.character.age, limitString: 30, regex: Numeric },
        { name: "eyes", value: data.character.appearance.eyes, limitString: 30, regex: AlphaAndSpecials },
        { name: "hair", value: data.character.appearance.hair, limitString: 60, regex: AlphaAndSpecials },
        { name: "skin", value: data.character.appearance.skin, limitString: 30, regex: AlphaAndSpecials },
        
        { name: "adjetives", value: data.personality.adjetives, limitString: 200, regex: AlphaAndSpecials },
        { name: "fears", value: data.personality.fears, limitString: 100, regex: AlphaAndSpecials },
        { name: "dreams", value: data.personality.dreams, limitString: 100, regex: AlphaAndSpecials },
        { name: "craze", value: data.personality.craze, limitString: 100, regex: AlphaAndSpecials },
        { name: "sexualOrientation", value: data.personality.sexualOrientation, limitString: 100, regex: AlphaAndSpecials },
        { name: "likes", value: data.personality.likes, limitString: 100, regex: AlphaAndSpecials },
        { name: "dislikes", value: data.personality.dislikes, limitString: 100, regex: AlphaAndSpecials },
        
        { name: "present", value: data.history.present, limitString: 100, regex: AlphanumericAndSpecials },
        { name: "past", value: data.history.past, limitString: 100, regex: AlphanumericAndSpecials },
        { name: "future", value: data.history.future, limitString: 100, regex: AlphanumericAndSpecials },
        
      ]
    } else if (origin == 'UpdateCharacter') {
      dataToValidate = [
        { name: "names", value: data.character.names, limitString: 30, regex: AlphaAndSpecials },
        { name: "lastNames", value: data.character.lastNames, limitString: 30, regex: AlphaAndSpecials },
        { name: "dateOfBorn", value: data.character.dateOfBorn, limitString: 30, regex: AlphanumericAndSpecials },
        { name: "skill", value: data.character.skill, limitString: 30, regex: Alphabetic },
        { name: "role", value: data.character.role, limitString: 30, regex: Alphabetic },
        { name: "range", value: data.character.range, limitString: 30, regex: Alphabetic },
        { name: "race", value: data.character.race, limitString: 30, regex: Alphabetic },
        { name: "power", value: data.character.power, limitString: 60, regex: AlphaAndSpecials },
        { name: "genere", value: data.character.genere, limitString: 30, regex: Alphabetic },
        { name: "age", value: data.character.age, limitString: 30, regex: Numeric },
        { name: "eyes", value: data.character.appearance.eyes, limitString: 30, regex: AlphaAndSpecials },
        { name: "hair", value: data.character.appearance.hair, limitString: 60, regex: AlphaAndSpecials },
        { name: "skin", value: data.character.appearance.skin, limitString: 30, regex: AlphaAndSpecials },
        
      ]
    } else if (origin == 'UpdatePersonality') {
      dataToValidate = [
        { name: "adjetives", value: data.personality.adjetives, limitString: 200, regex: AlphaAndSpecials },
        { name: "fears", value: data.personality.fears, limitString: 100, regex: AlphaAndSpecials },
        { name: "dreams", value: data.personality.dreams, limitString: 100, regex: AlphaAndSpecials },
        { name: "craze", value: data.personality.craze, limitString: 100, regex: AlphaAndSpecials },
        { name: "sexualOrientation", value: data.personality.sexualOrientation, limitString: 100, regex: AlphaAndSpecials },
        { name: "likes", value: data.personality.likes, limitString: 100, regex: AlphaAndSpecials },
        { name: "dislikes", value: data.personality.dislikes, limitString: 100, regex: AlphaAndSpecials },
        
      ]
    } else if (origin == 'UpdateHistory') {

      dataToValidate = [
        { name: "present", value: data.history.present, limitString: 100, regex: AlphanumericAndSpecials },
        { name: "past", value: data.history.past, limitString: 100, regex: AlphanumericAndSpecials },
        { name: "future", value: data.history.future, limitString: 100, regex: AlphanumericAndSpecials },
        
      ]
    } else if (origin == 'World') {
      dataToValidate = [
        { name: "name", value: data.name, limitString: 30, regex: AlphaAndSpecials },
        { name: "peopleName", value: data.peopleName, limitString: 30, regex: AlphaAndSpecials },
        { name: "type", value: data.type, limitString: 30, regex: AlphaAndSpecials },
        { name: "epoch", value: data.epoch, limitString: 60, regex: AlphaAndSpecials },
        { name: "goverment", value: data.goverment, limitString: 30, regex: AlphaAndSpecials },
        { name: "leader", value: data.leader, limitString: 30, regex: AlphaAndSpecials },
        { name: "economy", value: data.economy, limitString: 30, regex: AlphaAndSpecials },
        { name: "history", value: data.history, limitString: 60, regex: AlphaAndSpecials },
        { name: "fauna", value: data.fauna, limitString: 30, regex: AlphaAndSpecials },
        { name: "flora", value: data.flora, limitString: 30, regex: AlphaAndSpecials },
        { name: "weather", value: data.weather, limitString: 30, regex: AlphaAndSpecials },
        { name: "ethnicityName", value: data.ethnicity.ethnicityName, limitString: 60, regex: AlphaAndSpecials },
        { name: "ethnicityAbility", value: data.ethnicity.ethnicityAbility, limitString: 30, regex: AlphaAndSpecials },
        { name: "isMagical", value: data.ethnicity.isMagical, limitString: 30, regex: AlphaAndSpecials },
        { name: "educational", value: data.level.educational, limitString: 30, regex: AlphaAndSpecials },
        { name: "technological", value: data.level.technological, limitString: 30, regex: AlphaAndSpecials },
        { name: "medicinal", value: data.level.medicinal, limitString: 30, regex: AlphaAndSpecials },
      ]
    }

    for (const field of dataToValidate) {
      if (field.value) {
        if (field.value.length > field.limitString) throw `the-field-${field.name}-is-too-large`
        let isValid = field.regex.test(field.value)
        if (!isValid) throw `the-field-${field.name}-is-invalid`
      }
    }
    return true
  }
  catch (err) {
    return {
      msg: err,
      error: true
    }
  }
}