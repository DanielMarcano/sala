const router = require('express').Router();
const nodemailer = require('nodemailer');
const { Joi, Alquiler } = require('../models/alquiler');
// const { getAllEvents } = require('./events');

router.get('/', (req, res) => {
  res.status(200).render('index');
});

// router.get('/admin', (req, res) => {
//   res.status(200).render('html/admin');
// });

router.get('/contacto', (req, res) => {
  res.status(200).render('html/contacto');
});

router.get('/somos', (req, res) => {
  res.status(200).render('html/somos');
});

router.get('/programacion', async (req, res) => {
  // const events = await getAllEvents();
  // res.status(200).render('html/programacion', { events: JSON.parse(events) });
  res.status(200).render('html/programacion');
});

router.get('/alquiler', (req, res) => {
  res.status(200).render('html/alquiler');
});

const sendMail = function (req, res) {
  const {
    firstname, lastname, email, phone, address, business, more,
  } = req.body;

  const response = Joi.validate(
    {
      firstname,
      lastname,
      email,
      phone,
      address,
      business,
      more,
    },
    Alquiler,
  );

  if (response.error !== null) {
    return res.json({
      message: 'El mensaje no pudo ser enviado. Inténtelo de nuevo más tarde.',
    });
  }

  const output = `
    <p>Nombre: ${response.value.firstname}</p>
    <p>Apellido: ${response.value.lastname}</p>
    <p>Email: ${response.value.email}</p>
    <p>Teléfono: ${response.value.phone}</p>
    <p>Empresa: ${response.value.address}</p>
    <p>Empresa: ${response.value.business}</p>
    <p>Más sobre ti: ${response.value.more}</p>
  `;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'salaonbcnalquileres@gmail.com',
      pass: '123456Portland',
    },
  });

  const mailOptions = {
    from: '"Sala On" <salaonbcnalquileres@gmail.com>',
    to: 'salaonbcn@gmail.com',
    subject: 'Nueva Petición de Alquiler',
    html: output,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.json({ message: 'El mensaje se ha enviado correctamente.' });
  });
};

router.post('/alquiler', sendMail);

router.use((req, res, next) => {
  return res.status(404).render('html/error');
});

module.exports = {
  main: router,
};
