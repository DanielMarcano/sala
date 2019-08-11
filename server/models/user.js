const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    enum: ['Teatro', 'Micro Teatro', 'Concierto', 'Película'],
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    enum: ['Administrador', 'Editor'],
    default: 'Editor'
  }
})

const User = mongoose.model('User', UserSchema);

module.exports = { User };