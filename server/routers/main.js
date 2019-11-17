const router = require('express').Router();
const nodemailer = require('nodemailer');
const { Joi, Alquiler } = require('../models/alquiler');
const { getAllEvents } = require('./admin');

router.get('/', (req, res) => {
  res.status(200).render('index');
});

router.get('/contacto', (req, res) => {
  res.status(200).render('html/contacto');
});

router.get('/somos', (req, res) => {
  console.log(req.userContext);
  res.status(200).render('html/somos');
});

router.get('/programacion', async (req, res) => {
  const events = await getAllEvents();
  res.status(200).render('html/programacion', { events: JSON.parse(events) });
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
    host: 'smtp.thedefectivemoderns.es',
    port: 25,
    auth: {
      user: 'alquileres@thedefectivemoderns.es',
      pass: 'xyz00182B4rM4r',
    }
  });

  const mailOptions = {
    from: '"Sala On" <alquileres@thedefectivemoderns.es>',
    to: 'danielemarcano96@gmail.com',
    subject: 'Nueva Petición de Alquiler',
    html: output,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.json({
        message: 'El mensaje no pudo ser enviado. Inténtelo de nuevo más tarde.',
      });
    }
    res.json({ message: 'El mensaje se ha enviado correctamente.' });
  });
};

router.post('/alquiler', sendMail);

module.exports = {
  main: router,
};
