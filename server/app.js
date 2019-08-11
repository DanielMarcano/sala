require('./db/mongoose');

const { TOKEN_SECRET, PORT } = require('./config');
const path = require('path');
const distPath = path.join(__dirname, '../dist');

const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const { events } = require('./routers/events');
const { users } = require('./routers/users');
const { main } = require('./routers/main');

const app = express();

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
app.use(express.static(`${distPath}/html`));
app.use(express.static(distPath));

app.use(users);
app.use(events);
app.use(main);

app.listen(PORT, () => {
  console.log(`Server up and running at ${PORT}`);
});