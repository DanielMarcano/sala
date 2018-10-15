const express = require('express');
const path = require('path');
const compression = require('compression');
const { router } = require('./routes/main');

const distPath = path.join(__dirname, '../dist');
const PORT = process.env.PORT || 3000;

const app = express();

app.disable('x-powered-by');
app.use(compression());

app.set('view engine', 'ejs');
app.set('views', distPath);

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());
app.use(express.static(`${distPath}/html`));
app.use(express.static(distPath));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server up and running at ${PORT}`);
});