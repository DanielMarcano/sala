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
    enum: ['Teatro', 'Micro Teatro', 'Concierto', 
    'Película', 'Curso', 'Taller'],
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
  link: {
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

const formattedDescription = (description) => description.replace(new RegExp(/\.\s+/, 'g'), '.<br><br>');

EventSchema.pre('save', function (next) {
  if (!this.backgroundPath) {
    this.backgroundPath = this.get('posterPath');
  }
  if (!this.longDate) {
    this.longDate = this.get('shortDate');
  }

  this.description = formattedDescription(this.description);

  next();
});

const Event = mongoose.model('Event', EventSchema);

module.exports = { Event };

// const myEvent = new Event({
//   title: 'La fiesta de lo desconocido',
//   type: 'Concierto',
//   shortDate: '02/02/1996',
//   posterPath: 'esteve.jpg',
//   link: 'hehehehe',
//   description: 'My amazing event is here now. And I want to do it now. And I will... HAHA',
//   authors: 'The Duffel Brothers',
//   cast: 'Eleven y Daniel Marcano',
//   directors: 'Robert Chacon'
// });

// myEvent.save().then((me) => console.log('SAVED', me)).catch((err) => console.error(err.message));