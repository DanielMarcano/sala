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

app.use((req, res, next) => {
  return res.status(404).sendFile('/dist/html/error.html', {
    root: __dirname,
  });
});

app.listen(PORT, () => {
  console.log(`Server up and running at ${PORT}`);
});