import config from "../config/config.js"

const Alphabetic = /^[a-zA-Z\u00C0-\u017F]+$/
const Numeric = /^[0-9]+$/
const Alphanumeric = /^[0-9a-zA-Z\u00C0-\u017F]+$/
const AlphanumericAndSpecials = /^[a-zA-Z0-9\s\!\@\#\$\%\^\&\*\(\)\-\+\=\{\}\[\]\;\:\'\"\,\&#60;\.\&#62;\/\?]+$/
const AlphaAndSpecials = /^[a-zA-Z\s\!\@\#\$\%\^\&\*\(\)\-\+\=\{\}\[\]\;\:\'\"\,\&#60;\.\&#62;\/\?]+$/

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
        { name: "names", value: data.names, limitString: 30, regex: Alphabetic },
        { name: "lastNames", value: data.lastNames, limitString: 30, regex: Alphabetic },
        { name: "dateOfBorn", value: data.dateOfBorn, limitString: 30, regex: AlphanumericAndSpecials },
        { name: "skill", value: data.skill, limitString: 30, regex: Alphabetic },
        { name: "role", value: data.role, limitString: 30, regex: Alphabetic },
        { name: "range", value: data.range, limitString: 30, regex: Alphabetic },
        { name: "race", value: data.race, limitString: 30, regex: Alphabetic },
        { name: "power", value: data.power, limitString: 60, regex: AlphaAndSpecials },
        { name: "genere", value: data.genere, limitString: 30, regex: Alphabetic },
        { name: "age", value: data.age, limitString: 30, regex: Numeric },
        { name: "eyes", value: data.appearance.eyes, limitString: 30, regex: AlphaAndSpecials },
        { name: "hair", value: data.appearance.hair, limitString: 60, regex: AlphaAndSpecials },
        { name: "skin", value: data.appearance.skin, limitString: 30, regex: AlphaAndSpecials },
        { name: "location", value: data.location, limitString: 30, regex: AlphaAndSpecials },
      ]
    } else if (origin == 'World') {
      dataToValidate = [
        { name: "names", value: data.names, limitString: 30, regex: Alphabetic },
        { name: "lastNames", value: data.lastNames, limitString: 30, regex: Alphabetic },
        { name: "dateOfBorn", value: data.dateOfBorn, limitString: 30, regex: AlphanumericAndSpecials },
        { name: "skill", value: data.skill, limitString: 60, regex: AlphanumericAndSpecials },
        { name: "role", value: data.role, limitString: 30, regex: Alphabetic },
        { name: "range", value: data.range, limitString: 30, regex: Alphanumeric },
        { name: "race", value: data.race, limitString: 30, regex: Alphanumeric },
        { name: "power", value: data.power, limitString: 60, regex: Alphanumeric },
        { name: "genere", value: data.genere, limitString: 30, regex: Alphanumeric },
        { name: "age", value: data.age, limitString: 30, regex: Alphanumeric },
        { name: "eyes", value: data.appearance.eyes, limitString: 30, regex: Alphanumeric },
        { name: "hair", value: data.appearance.hair, limitString: 60, regex: Alphanumeric },
        { name: "skin", value: data.appearance.skin, limitString: 30, regex: Alphanumeric },
        { name: "location", value: data.location, limitString: 30, regex: Alphanumeric },
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