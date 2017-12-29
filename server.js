// external requirements
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');
// internal requirements
const Family = require('./app/models/family');
const Member = require('./app/models/member');
const ListItem = require('./app/models/listItem');
const UrlEmail = require('./app/models/urlEmail');
const Config = require('./config');

let hostUrl = Config.deployHostUrl;
if (process.env.USERDOMAIN === 'JEDHA') {
  hostUrl = Config.localHostUrl;
}

// app setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('web'));

// port setup
const port = process.env.PORT || 8080;
app.listen(port);
console.log('server.js using port ' + port);

// routing
const router = express.Router();
// USE middleware
app.use('/', router);
router.use((req, res, next) => {
  console.log('api: ' + req.method + ' ' + req.url);
  next();
});
router.get('/api', (req, res) => {
  res.json({message: 'routing works'});
});
// POST new family
router.post('/api/new/family', (req, res) => {
  const family = newFamily(req.body.name, req.body.email);
  family.save((err) => {
    if (err) {
      res.status(500).send(err);
    };
    res.json(family);
  });
})
// GET existing member
router.get('/family/:family_id/:member_id', async (req, res) => {
  // try {
  //   const familyArray = await Family.find({ famId: req.params.family_id }, `-members.${req.params.member_id}._id -_id -__v`)
  //   const family = familyArray[0];
  //   if (family.members[req.params.member_id] &&
  //       family.members[req.params.member_id].deleted === false) {
  //     res.json(family);
  //   } else {
  //     throw 'account not found';
  //   }
  // } catch (err) {
  //   console.error(err);
  //   res.send(err);
  // }
  res.sendfile('index.html', {root: './web'});
});
// PUT mark existing member as deleted

// GET email test
router.get('/api/email-test', async (req, res) => {
    const sentEmail = await UrlEmail.send('ender@happyleviathan.com', '');
    res.status(sentEmail.status).send(sentEmail.body);
});
// POST email
router.post('/api/email', async (req, res) => {
  const family = await Family.findOne({ 'members.email': req.body.email });
  if (family === null) {
    const family = newFamily(req.body.name, req.body.email);
    family.save(async (err) => {
      if (err) {
        res.status(500).send(err);
      };
      const url = createUrl(family.famId, family.members[0].memberId);
      const sentEmail = await UrlEmail.send(req.body.email, url);
      res.status(sentEmail.status).send(sentEmail.body); 
    });
  } else {
    const member = family.members.find(member => member.email === req.body.email);
    const url = createUrl(family.famId, member.memberId);
    const sentEmail = await UrlEmail.send(req.body.email, url);
    res.status(sentEmail.status).send(sentEmail.body);   
  }
});

// database setup (mongodb on mlab)
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${Config.mongoosePublic}:${Config.mongoosePrivate}@ds019698.mlab.com:19698/ender-christmas-list`, { useMongoClient: true} , (err) => {
  if(!err) {
    console.log('connected to mongo')
  };
});

function newFamily(name, email) {
  const family = new Family();
  family.famId = uuid();
  const memberId = uuid();
  family.members = [];
  const parent = new Member()
  parent.memberId = memberId;
  parent.name = name;
  parent.email = email;
  parent.parent = true;
  parent.deleted = false;
  parent.list = {};
  family.members.push(parent);
  return family;
};

function createUrl(familyId, memberId) {
  return `${hostUrl}family/${familyId}/${memberId}`;
}