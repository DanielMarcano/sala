const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    enum: ['Admin', 'Editor'],
    default: 'Admin'
  }
})

const User = mongoose.model('User', UserSchema);

module.exports = { User };