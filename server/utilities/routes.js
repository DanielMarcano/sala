exports = module.exports;

exports.getAll = (model) => async (req, res) => {
    try {
      const result = await model.find({})

      if (!result) return res.status(404).send();

      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  };