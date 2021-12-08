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
app.get('/loaderio-5ff779c0e099701885989c46c13db70f', (req, res) => {
  res.send('loaderio-5ff779c0e099701885989c46c13db70f');
});

app.use('/products', routerProducts);

//app.use('/products', router);
// app.get('/', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' })
// })

app.listen(app.get('port'));

console.log('listening to port 3000');

