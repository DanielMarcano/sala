const express = require('express');
const path = require('path');
const compression = require('compression');

const PORT = process.env.PORT || 3000;

const app = express();

app.disable('x-powered-by');
app.use(compression());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/dist'));

app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/dist')));

app.get('/', (req, res) => {
  res.status(200).render('index');
});

app.get('/contacto', (req, res) => {
  res.status(200).render('html/contacto');
});

app.use((req, res, next) => {
  return res.status(404).render('html/error');
});

app.listen(PORT, () => {
  console.log(`Server up and running at ${PORT}`);
});