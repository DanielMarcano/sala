const _ = require('lodash');
const router = require('express').Router();
const Task = require('../models/task');
const utilities = require('../utilities/routes');

router
  .route('/tasks')
  .post(async (req, res) => {
    const task = new Task(req.body);

    try {
      await task.save();

      res.status(201).send(task);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  .get(utilities.getAll(Task));

router
  .route('/tasks/:id')
  .get(async (req, res) => {
    const _id = req.params.id;

    try {
      const task = await Task.findById(_id);

      if (!task) return res.status(404).send();

      res.status(200).send(task);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .patch(async (req, res) => {
    const update = _.pick(req.body, ['description', 'completed']);
    const _id = req.params.id;

    try {
      const task = await Task.findById(_id);

      if (!task) return res.status(404).send({ error: 'Task could not be found' });

      task.set(update);

      const updated = await task.save();

      if (!updated) return res.status(400).send({ error: 'Task could not be updated' });

      res.status(200).send(updated);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const _id = req.params.id;

    try {
      const task = await Task.findById(_id);

      if (!task) return res.status(404).send({ error: 'Task was not found' });

      await task.delete();

      res.status(200).send(task);
    } catch (error) {
      res.status(500).send({ error: 'Task was not deleted' });
    }
  });

router.use((req, res, next) => {
  return res.status(404).render('html/error');
});

module.exports = router;
