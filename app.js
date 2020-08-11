var app = require('express')();
var bodyParser = require('body-parser');
var openapi = require('express-openapi');
var path = require('path');
var cors = require('cors');
var fs = require('fs');

app.use(cors());
app.use(bodyParser.json());

openapi.initialize({
  apiDoc: fs.readFileSync(path.resolve(__dirname, './api-doc.yml'), 'utf8'),
  app: app,
  promiseMode: true,
  paths: path.resolve(__dirname, 'api-routes'),
});

app.use(function (err, req, res, next) {
  res.status(err.status).json(err.message);
});

module.exports = app;

app.listen(8080);

