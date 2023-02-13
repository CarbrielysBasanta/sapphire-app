const Alphabetic = /^[a-zA-Z\u00C0-\u017F]+$/
const Numeric = /^[0-9]+$/
const Alphanumeric = /^[0-9a-zA-Z\u00C0-\u017F]+$/
const AlphanumericAndSpecials = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g

export const validateData = (data) => {
  try {
    let dataToValidate = [
      {name:"fullName", value: data.fullName, limitString: 30, regex: Alphabetic},
      {name:"nickName", value: data.nickName, limitString: 30, regex: AlphanumericAndSpecials},
      {name:"description", value: data.description, limitString: 30, regex: Alphanumeric},
      // {name:"email", value: data.email, limitString: 30, regex: AlphanumericAndSpecials},
      {name:"location", value: data.location, limitString: 30, regex: Alphabetic},
      // {name:"facebook", value: data.socialMedia.facebook, limitString: 30, regex: Alphanumeric}
    ]
    for (const field of dataToValidate) {
      if (field.value) {
        if (field.value.length > field.limitString) throw `the-field-${field.name}-is-too-large`
        let isValid = field.regex.test(field.value)
        if (!isValid) throw `the-field-${field.name}-is-invalid`
      }
    }
  }
  catch(err) {
    throw err
  }
}