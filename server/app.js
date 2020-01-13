require('./db/mongoose');
const path = require('path');
const session = require('express-session');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');

const { admin } = require('./routers/admin');
const { main } = require('./routers/main');
const { PORT } = require('./config');

const distPath = path.join(__dirname, '../dist');
const app = express();

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    lng: 'es',
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.missing.json'),
    },
    ns: ['translations'],
    defaultNS: 'translations',
    fallbackLng: 'es',
    preload: ['es', 'en', 'cat'],
    saveMissing: true,
    debug: true,
    detection: {
      order: ['path', 'session', 'querystring', 'cookie'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupSession: 'lng',
      lookupPath: 'lng',
    },
  });

app.use(i18nextMiddleware.handle(i18next, {
  removeLngFromUrl: false,
}));

const oidc = new ExpressOIDC({
  issuer: 'https://dev-452247.okta.com/oauth2/default',
  client_id: '0oa1kjwuj0hrbtvuA357',
  client_secret: 'rIqlMdUbI097RVBruZ1r8BLYGWpWMtovaLTxHKky',
  appBaseUrl: process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' : 'http://www.salaonbcn.com',
  routes: {
    loginCallback: {
      path: '/users/callback',
      afterCallback: '/admin',
    },
  },
  scope: 'openid profile',
});

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
app.use(session({
  cookie: { httpOnly: true },
  secret: 'SOMETIMES_MY_MOM_COMES_TO_ME_STRANGER_THINGS',
  resave: true,
  saveUninitialized: false,
}));

app.use(oidc.router);

app.post('/forces-logout', oidc.forceLogoutAndRevoke(), (req, res) => {
});

app.use(express.static(`${distPath}/html`));
app.use(express.static(distPath));

app.use('/', main);
app.use('/admin', oidc.ensureAuthenticated(), admin);

oidc.on('ready', () => {
  app.listen(PORT, () => {
    console.log(`Server up and running at ${PORT}`);
  });
});

oidc.on('error', (err) => {
  console.error(err);
});

module.exports = { i18next };