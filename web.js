const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

app.post('/', function (req, res) {
  console.log(JSON.stringify(req.body));
  let dims = req.body.jsonPayload.arena.dims;
  let state = req.body.jsonPayload.arena.state;
  console.log('dims ',JSON.stringify(dims));
  console.log('state ',JSON.stringify(state));
  const moves = ['F', 'T', 'L', 'R'];
  
  // TODO add your implementation here to replace the random response
  
  res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
