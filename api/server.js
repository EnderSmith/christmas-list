let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8080;

let router = express.Router();

router.get('/', (req, res) => {
  res.json({message: 'test'});
});

app.use('/api', router);

app.listen(port);
console.log('server.js using port ' + port);