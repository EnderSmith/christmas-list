const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
app.listen(port);
console.log('server.js using port ' + port);

const Family = require('./app/models/family');
const Member = require('./app/models/member');
const ListItem = require('./app/models/listItem');
const UrlEmail = require('./app/models/urlEmail');

const router = express.Router();
app.use('/api', router);
router.use((req, res, next) => {
  console.log('api: ' + req.method + ' ' + req.url);
  next();
});
router.get('/', (req, res) => {
  res.json({message: 'test'});
});
router.post('/family', (req, res) => {
  const family = new Family();
  family.famId = 'f-1000';
  family.members = {};
  const memberId = 'randomstring';
  family.members[memberId] = new Member()
  family.members[memberId].name = req.body.name;
  family.members[memberId].email = req.body.email;
  family.members[memberId].parent = true;
  family.members[memberId].deleted = false;
  family.members[memberId].list = {};
  family.save((err) => {
    if (err) {
      res.send(err);
    };
    res.json(family);
  });
})
router.get('/:family_id/:member_id', async (req, res) => {
  try {
    const familyArray = await Family.find({ famId: req.params.family_id }, `-members.${req.params.member_id}._id -_id -__v`)
    const family = familyArray[0];
    if (family.members[req.params.member_id] &&
        family.members[req.params.member_id].deleted === false) {
      res.json(family);
    } else {
      throw 'account not found';
    }
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});
router.get('/email-test', async (req, res) => {
    const sentEmail = await UrlEmail.send('ender@happyleviathan.com', '');
    res.status(sentEmail.status).send(sentEmail.body);
});

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://christmas-list:xmas1225@ds019698.mlab.com:19698/ender-christmas-list', { useMongoClient: true} , (err) => {
  if(!err) {
    console.log('connected to mongo')
  };
});
