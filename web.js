const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let _isMoved = true
let _lastMove = ''
let _lastDim = []
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

app.post('/', function (req, res) {

  console.log(JSON.stringify(req.body));
  let dims = req.body.arena.dims;
  let state = req.body.arena.state;
  console.log('dims ',JSON.stringify(dims));
  console.log('state ',JSON.stringify(state));
  const moves = ['F', 'T', 'L', 'R'];
  _lastMove = moves
  _lastDim = dims
  _isMoved = !_isMoved
  console.log('last move ',_lastMove);
  console.log('last dim ',_lastDim);
  console.log('is moved ',_isMoved);
  // TODO add your implementation here to replace the random response
  
  res.send(moves[Math.floor(Math.random() * moves.length)]);
});

app.listen(process.env.PORT || 8080);
