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

  const output = `<div class="body" style="margin: 0;padding: 0;box-sizing: border-box;color: white;font-weight: lighter;background-color: black;font-family: HelveticaNeue-Light, HelveticaNeue, Helvetica, 'Lucida Grande', Arial, sans-serif;position: relative;padding: 1rem 1.5rem;">
  <header style="margin: 0;padding: 0;box-sizing: border-box;color: white;font-weight: lighter;margin-bottom: 30px;">
      <h1 style="margin: 0;padding: 0;padding-top: 30px;box-sizing: border-box;color: white;font-weight: lighter;text-align: center;text-transform: uppercase;letter-spacing: .5rem;text-indent: .5rem;">Petición de Alquiler</h1>
    </header>
  <table style="margin: 0;padding: 0;box-sizing: border-box;color: white;font-weight: lighter;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);border-spacing: 1rem; margin: 50px 0;>
    <thead style="margin: 0;padding: 0;box-sizing: border-box;color: white;font-weight: lighter;">
      <tr style="margin: 0;padding: 0;box-sizing: border-box;color: white;font-weight: lighter;">
        <th class="box__header" style="margin: 0;padding: 0.5rem .1rem;box-sizing: border-box;color: black;font-weight: lighter;background-color: white;text-transform: uppercase;letter-spacing: .4rem;text-indent: .4rem;">Nombre</th>
        <th class="box__header" style="margin: 0;padding: 0.5rem .1rem;box-sizing: border-box;color: black;font-weight: lighter;background-color: white;text-transform: uppercase;letter-spacing: .4rem;text-indent: .4rem;">Apellido</th>
        <th class="box__header" style="margin: 0;padding: 0.5rem .1rem;box-sizing: border-box;color: black;font-weight: lighter;background-color: white;text-transform: uppercase;letter-spacing: .4rem;text-indent: .4rem;">Email</th>
        <th class="box__header" style="margin: 0;padding: 0.5rem .1rem;box-sizing: border-box;color: black;font-weight: lighter;background-color: white;text-transform: uppercase;letter-spacing: .4rem;text-indent: .4rem;">Teléfono</th>
        <th class="box__header" style="margin: 0;padding: 0.5rem .1rem;box-sizing: border-box;color: black;font-weight: lighter;background-color: white;text-transform: uppercase;letter-spacing: .4rem;text-indent: .4rem;">Dirección</th>
        <th class="box__header" style="margin: 0;padding: 0.5rem .1rem;box-sizing: border-box;color: black;font-weight: lighter;background-color: white;text-transform: uppercase;letter-spacing: .4rem;text-indent: .4rem;">Empresa</th>
        <th class="box__header" style="margin: 0;padding: 0.5rem .1rem;box-sizing: border-box;color: black;font-weight: lighter;background-color: white;text-transform: uppercase;letter-spacing: .4rem;text-indent: .4rem;">Más sobre ti</th>
      </tr>
    </thead>
    <tbody style="margin: 0;padding: 0;box-sizing: border-box;color: white;font-weight: lighter;text-align: center;">
      <tr style="margin: 0;padding: 0;box-sizing: border-box;color: white;font-weight: lighter;">
        <td style="margin: 0;padding: 0;box-sizing: border-box;color: white;font-weight: lighter;">
          ${response.value.firstname}
        </td>
        <td style="margin: 0;padding: 0;box-sizing: border-box;color: white;font-weight: lighter;">
          ${response.value.lastname}
        </td>
        <td style="margin: 0;padding: 0;box-sizing: border-box;color: white;font-weight: lighter;">
          ${response.value.email}
        </td>
        <td style="margin: 0;padding: 0;box-sizing: border-box;color: white;font-weight: lighter;">
          ${response.value.phone}
        </td>
        <td style="margin: 0;padding: 0;box-sizing: border-box;color: white;font-weight: lighter;">
          ${response.value.address}
        </td>
        <td style="margin: 0;padding: 0;box-sizing: border-box;color: white;font-weight: lighter;">
          ${response.value.business}
        </td>
        <td style="margin: 0;padding: 0;box-sizing: border-box;color: white;font-weight: lighter;">
          ${response.value.more}
        </td>
      </tr>
    </tbody>
  </table>
</div>`;

  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: process.env.SMTP_PORT,
    tls: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: true,
    }
  });

  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.mailtrap.io',
  //   port: 2525,
  //   auth: {
  //     user: '23e1b361932e9f',
  //     pass: '2ad96dae079cc9',
  //   },
  //   tls: {
  //     rejectUnauthorized: true
  //   },
  // });

//   transporter.verify(function(error, success) {
//     if (error) {
//          console.log(error);
//     } else {
//          console.log('Server is ready to take our messages');
//     }
//  });

  const mailOptions = {
    from: '"Sala On" <salaonbcn@gmail.com>',
    to: 'salaonbcn@gmail.com',
    subject: 'Nueva Petición de Alquiler',
    html: output,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
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
