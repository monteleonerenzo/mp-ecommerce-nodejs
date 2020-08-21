
var express = require('express');
var exphbs = require('express-handlebars');
var mercadopago = require('mercadopago');
var http = require('http');

mercadopago.configure({
  sandbox: true,
  access_token: 'TEST-8686215805190121-050722-61c5537b5a06b0bee218e7d9aa4004e2-203883940'
});

let preference = {
  items: [
    {
      title: 'Mi producto',
      unit_price: 100,
      quantity: 1,
    }
  ]
};

mercadopago.preferences.create(preference)
  .then(function (response) {
    // Este valor reemplazará el string "<%= global.id %>" en tu HTML
    global.id = response.body.id;
    console.log(global.id);

  }).catch(function (error) {
    console.log(error);
  });



var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/detail', function (req, res) {
  res.render('detail', req.query);
});

app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
