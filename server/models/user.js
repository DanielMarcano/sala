const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    set: function(age) {
      this._previousAge = this.age;
      return age;
    },
    validate: {
      validator: (value) => {
        return !(value < 0);
      },
      message: 'Age must be bigger than 0',
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'You must provide a valid email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
    validate: {
      validator: (value) => {
        return !value.toLowerCase().includes('password');
      },
      message: 'Password cannot contain the string "password"',
    },
  },
});

UserSchema.pre('remove', (next) => {
  console.log('pre remove');
  next();
});

UserSchema.post('remove', (removed, next) => {
  console.log('post remove');
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
