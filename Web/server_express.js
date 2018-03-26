const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

const validateRequest = (req, res, next) => {
  if (req.body.name) {
    next();
  } else {
    res.send('What is your name?');
  }
};

const handleRequest = (req, res, next) => {
  res.send('Hello, ' + req.body.name);
};

app.post('/greeting', validateRequest, handleRequest);

app.listen('3000', () => {
  console.log('Server is running');
});