const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
app.listen(port);
console.log('server.js using port ' + port);

const router = express.Router();
app.use('/api', router);
router.get('/', (req, res) => {
  res.json({message: 'test'});
});

const Member = require('./app/models/member');

const mongoose = require('mongoose');
mongoose.connect('mongodb://christmas-list:xmas1225@ds019698.mlab.com:19698/ender-christmas-list', { useMongoClient: true} , (err) => {
  if(!err) {
    console.log('connected to mongo')
  };
});