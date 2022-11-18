const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MIN, MAX, RIGHTMAX, BOTTOMAX, DIRECTION, MOVES } = require('./constants');
let _isMoved = false
let _lastMove = ''
let _lastDim = []
let lastMovedCount = 0
const myUrl = 'https://cloud-run-hackathon-nodejs-wg35wopo7q-uc.a.run.app'
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

app.post('/', function (req, res) {
  console.log('body',JSON.stringify(req.body));
  console.log('last move ',_lastMove);
  console.log('last dim ',_lastDim);
  console.log('is moved ',_isMoved);
  let dims = req.body.arena.dims;
  let state = req.body.arena.state;

 let myDirection = state[myUrl].direction;
  console.log('dims ',JSON.stringify(dims));
  console.log('myDirection ',JSON.stringify(myDirection));
  const moves = ['F', 'L', 'R'];
  const attack  = 'T'
  let newMove = null
  if(dims === MIN){
    if(myDirection === 'S' || myDirection === 'E'){
      newMove = MOVES.F
    }else{      
      newMove = MOVES.R
    }
  }
  else if(dims === RIGHTMAX){
    if(myDirection === 'S' || myDirection === 'E'){
      newMove = MOVES.F
      }else{
        newMove = MOVES.R
      }
  }
  else if(dims === MAX){
    if(myDirection === 'N' || myDirection === 'W'){
      newMove = MOVES.F
      }else{
        newMove = MOVES.R
      }

  }
  else if(dims === BOTTOMAX){
    if(myDirection === 'N' || myDirection === 'E'){
      newMove = MOVES.F
      }else{
        newMove = MOVES.R
      }
  }
  if(newMove && lastMovedCount<3){
    res.send(newMove);
    lastMovedCount++
    _isMoved = true
  }
  else if(lastMovedCount==0){
    newMove = moves[Math.floor(Math.random() * moves.length)];
    lastMovedCount++
    _isMoved = true
    res.send(newMove);
  }
  else{
    res.send(attack);
    lastMovedCount = 0
    _isMoved = false
  }
  _lastMove = newMove
  _lastDim = dims
  
  // TODO add your implementation here to replace the random response
});

app.listen(process.env.PORT || 8080);
