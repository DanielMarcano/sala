const router = require('express').Router();
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {
  res.status(200).render('index');
});

router.get('/contacto', (req, res) => {
  res.status(200).render('html/contacto');
});

router.get('/somos', (req, res) => {
  res.status(200).render('html/somos');
});

router.get('/programacion', (req, res) => {
  res.status(200).render('html/programacion');
});

router.get('/alquiler', (req, res) => {
  res.status(200).render('html/alquiler');
});

const sendMail = function (req, res) {

  const output = `
    <p>Nombre: ${req.body.name}</p>
    <p>Apellido: ${req.body.lastname}</p>
    <p>Email: ${req.body.email}</p>
    <p>Teléfono: ${req.body.phone}</p>
    <p>Empresa: ${req.body.business}</p>
    <p>Más sobre ti: ${req.body.more}</p>
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
    to: 'danielemarcano96@gmail.com',
    subject: 'Nueva Petición de Alquiler',
    html: output,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('html/alquiler', { success: 'El mensaje se ha enviado correctamente' });
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
};

router.post('/pedir_alquiler', sendMail);

router.use((req, res, next) => {
  return res.status(404).render('html/error');
});

module.exports = {
  router,
};