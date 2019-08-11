const _ = require('lodash');
const router = require('express').Router();
const { User } = require('../models/user');
const utilities = require('../utilities/routes');

router
  .route('/users')
  .post(async (req, res) => {
    const user = new User(req.body);

    try {
      await user.save();

      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .get(utilities.getAll(User));

router
  .route('/users/:id')
  .patch(async (req, res) => {
    const update = _.pick(req.body, ['name', 'password', 'role']);
    const _id = req.params.id;

    try {
      const user = await User.findById(req.params.id);

      if (!user) return res.status(404).send({ error: 'User could not be found' });

      user.set(update);

      const updated = await user.save();

      if (!updated) return res.status(400).send({ error: 'User could not be updated' });

      res.status(200).send(updated);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  .get(async (req, res) => {
    const _id = req.params.id;

    try {
      const user = await User.findById(_id);

      if (!user) return res.status(404).send();

      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const _id = req.params.id;

    try {
      const user = await User.findbyId(_id);

      if (!user) return res.status(404).send({ error: 'User not found' });

      await user.delete();

      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ error: 'User was not deleted' });
    }
  });

module.exports = {
  users: router
};
