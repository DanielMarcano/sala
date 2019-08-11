const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['Teatro', 'Micro Teatro', 'Concierto', 'Película'],
    required: true
  },
  action: {
    type: String,
    enum: ['Comprar', 'Contactar'],
    default: 'Comprar'
  },
  shortDate: {
    type: String,
    required: true,
    trim: true
  },
  lastDate: {
    type: String,
    trim: true
  },
  longDate: {
    type: String,
    trim: true
  },
  posterPath: {
    type: String,
    required: true,
    trim: true
  },
  backgroundPath: {
    type: String,
    trim: true
  },
  more: {
    type: String,
    enum: ['Descripción', 'Sinopsis'],
    default: 'Descripción'
  },
  description: {
    type: String,
    required: true
  },
  authors: {
    type: String,
    trim: true
  },
  cast: {
    type: String,
    trim: true
  },
  directors: {
    type: String,
    trim: true
  }
})

EventSchema.pre('save', function (next) {
  if (!this.backgroundPath) {
    this.backgroundPath = this.get('posterPath');
  }
  if (!this.longDate) {
    this.longDate = this.get('shortDate');
  }
  next();
});

const Event = mongoose.model('Event', EventSchema);

module.exports = { Event };

// const myEvent = new Event({
//   title: 'The Neverending Party',
//   type: 'Concierto',
//   shortDate: '02/02/1996',
//   posterPath: 'esteve.jpg',
//   description: 'My amazing event is here now',
//   authors: 'The Duffel Brothers',
//   cast: 'Eleven y Daniel Marcano',
//   directors: 'Robert Chacon'
// });

// myEvent.save().then((me) => console.log('SAVED', me)).catch((err) => console.error(err.message));