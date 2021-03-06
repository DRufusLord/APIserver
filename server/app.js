const express = require('express');

const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const routerProducts = require('./routerProducts')


const app = express();
module.exports.app = app;

app.set('port', 3000);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/loaderio-40ce1d8267bcad84efc9dbed1a488299', (req, res) => {
  res.send('loaderio-40ce1d8267bcad84efc9dbed1a488299');
});

app.use('/products', routerProducts);

//app.use('/products', router);
// app.get('/', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' })
// })

app.listen(app.get('port'));

console.log('listening to port 3000');

