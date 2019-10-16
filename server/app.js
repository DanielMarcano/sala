require('./db/mongoose');

const { PORT } = require('./config');
const path = require('path');
const distPath = path.join(__dirname, '../dist');
const session  = require('express-session');

const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
// const passport = require('passport');

const { admin } = require('./routers/admin');
const { users } = require('./routers/users');
const { main } = require('./routers/main');
const okta = require('@okta/okta-sdk-nodejs');
// const { oidc } = require('./config/okta');

// console.log(oidc);

const app = express();

const oktaClient = new okta.Client({
  orgUrl: 'https://dev-452247.okta.com',
  token: '00gvEv6da8dItbSkY7lUAhv7OmnETkd3Cv60bSgCJs'
});

// const oidc = new ExpressOIDC({
//   issuer: 'https://dev-452247.okta.com/oauth2/default',
//   client_id: '0oa1kjwuj0hrbtvuA357',
//   client_secret: 'rIqlMdUbI097RVBruZ1r8BLYGWpWMtovaLTxHKky',
//   redirect_uri: 'http://localhost:3001/users/callback',
//   scope: 'openid profile',
//   routes: {
//     login: {
//       path: '/login'
//     },
//     callback: {
//       path: '/users/callback',
//       defaultRedirect: '/admin'
//     }
//   }
// });

const ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC;

const oidc = new ExpressOIDC({
    issuer: 'https://dev-452247.okta.com/oauth2/default',
    client_id: '0oa1kjwuj0hrbtvuA357',
    client_secret: 'rIqlMdUbI097RVBruZ1r8BLYGWpWMtovaLTxHKky',
    redirect_uri: 'http://localhost:3001/users/callback',
    routes: {
      callback: { 
        path: '/users/callback',
        defaultRedirect: '/admin' 
      }
    },
    scope: 'openid profile',
  });




require('./config/passport');

app.use(helmet());
app.use(compression());

app.set('view engine', 'ejs');
app.set('views', distPath);

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());
// app.use(passport.initialize());

app.use(session({
  cookie: { httpOnly: true },
  secret: 'SOMETIMES_MY_MOM_COMES_TO_ME_STRANGER_THINGS',
  resave: true,
  saveUninitialized: true,
}));

app.use(oidc.router);

// app.use((req, res, next) => {
//   if (!req.userinfo) {
//     return next();
//   }

//   oktaClient.getUser(req.userinfo.sub)
//     .then(user => {
//       req.user = user;
//       res.locals.user = user;
//       next();
//     }).catch(err => {
//       next(err);
//     });
// });

// function loginRequired(req, res, next) {
//   if (!req.user) {
//     return res.status(200).render('index');
//   }

//   next();
// }

// app.use(oidc.router);

app.use(express.static(`${distPath}/html`));
app.use(express.static(distPath));

app.use('/', main);
app.use('/admin', oidc.ensureAuthenticated(), admin);

// app.use(oidc.ensureAuthenticated());


// app.use((req, res, next) => {
//   return res.status(404).render('html/error');
// });

// app.get('/admin', , (req, res) => {
//   console.log('n n n n ');
//   res.status(200).render('html/admin');
// });

oidc.on('ready', () => {
  app.listen(PORT, () => {
    console.log(`Server up and running at ${PORT}`);
  });
});

oidc.on('error', err => {
  console.error(err);
});