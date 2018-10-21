const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).render('index');
});

router.get('/contacto', (req, res) => {
  res.status(200).render('html/contacto');
});

router.get('/somos', (req, res) => {
  res.status(200).render('html/somos');
});

router.get('/alquiler', (req, res) => {
  res.status(200).render('html/alquiler');
});

router.get('/programacion', (req, res) => {
  res.status(200).render('html/programacion');
});

router.use((req, res, next) => {
  return res.status(404).render('html/error');
});

module.exports = { router };