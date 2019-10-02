const _ = require('lodash');
const router = require('express').Router();
const { Event } = require('../models/event');
const utilities = require('../utilities/routes');
const path = require('path');
const multer  = require('multer');
const crypto = require('crypto');
const mime = require('mime');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../dist/img'))
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, `${raw.toString('hex')}.${mime.extension(file.mimetype)}`)
    })
  }
})
const upload = multer({ storage });

router
  .route('/events')
  .post(upload.fields([{ name: 'poster', maxCount: 1 }, { name: 'background', maxCount: 1 }]), async (req, res) => {
    const eventData = _.pick(req.body, [
      'title', 
      'type',
      'shortDate',
      'longDate',
      'description',
      'authors',
      'cast',
      'directors',
      'link'
    ]);

    eventData.posterPath = await req.files.poster[0].filename;
    
    if (req.files.background) {
      eventData.backgroundPath = req.files.background[0].filename;
    }

    const event = new Event(eventData);

    try {
      await event.save();

      res.status(201).render('html/admin', { message: '¡El evento ha sido creado!' });
    } catch (error) {
      res.status(500).render('html/admin', { message: 'El evento no ha sido creado...' });
    }
  });

const getAllEvents = async () => {
  const model = Event;
    try {
      const result = await model.find({})
      return JSON.stringify(result);
    } catch(e) {
      return e;
    }
  };

router
  .route('/events/:id')
  .get(async (req, res) => {
    const _id = req.params.id;

    try {
      const event = await Event.findById(_id);

      if (!event) return res.status(404).send();

      res.status(200).send(event);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .patch(async (req, res) => {
    const update = _.pick(req.body, ['description', 'completed']);
    const _id = req.params.id;

    try {
      const event = await Event.findById(_id);

      if (!event) return res.status(404).send({ error: 'Event could not be found' });

      event.set(update);

      const updated = await event.save();

      if (!updated) return res.status(400).send({ error: 'Event could not be updated' });

      res.status(200).send(updated);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const _id = req.params.id;

    try {
      const event = await Event.findById(_id);

      if (!event) return res.status(404).send({ error: 'Event was not found' });

      await event.delete();

      res.status(200).send(event);
    } catch (error) {
      res.status(500).send({ error: 'Event was not deleted' });
    }
  });

module.exports = {
  events: router,
  getAllEvents,
}