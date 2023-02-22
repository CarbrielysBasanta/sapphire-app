import dotenv from 'dotenv'
dotenv.config()

export default {
  PORT: 3000,
  Regex: {
    Alphabetic: /^[a-zA-Z\s]+$/,
    Numeric: /^[0-9]+$/,
    Alphanumeric: /^[0-9a-zA-Z\u00C0-\u017F]+$/,
    AlphanumericAndSpecials: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g
  }
}
