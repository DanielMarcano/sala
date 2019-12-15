module.exports = {
  // 1. MongoDB
  MONGO_URI: process.env.NODE_ENV !== 'production' ? 'mongodb://127.0.0.1:27017/salaonbcn' : 'mongodb+srv://roberton:Xtqw6BQm29RziXbq@cluster0-wgnaf.mongodb.net/test?retryWrites=true&w=majority',

  // 2. JWT
  // TOKEN_SECRET: process.env.TOKEN_SECRET ||
  // 'pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L',
  // 3. Express Server Port
  PORT: process.env.PORT || 3000,
  secret: 'worldisfullofdevelopers',
  env: process.env.NODE_ENV !== 'production' ? 'http://localhost:3001/' : 'http://www.salaonbcn.com/',
};