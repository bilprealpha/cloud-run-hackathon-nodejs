const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MIN, MAX, RIGHTMAX, BOTTOMAX, DIRECTION, MOVES, END } = require('./constants');
const e = require('express');
let _isMoved = false
let _lastMove = ''
let _lastDim = []
let _isTurned = false
let lastMovedCount = 0
let totalAttacks = 0
let totalMoves = 0
let lastscore = 0
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
  let state = req.body.arena.state;
  let newMove = null

 let myDirection = state[myUrl] ? state[myUrl].direction : 'W';
 let newScore = state[myUrl] ? state[myUrl].score : 0;
 let dims = state[myUrl] ? [state[myUrl].x, state[myUrl].y] : [0,0];

 console.log('new score ',newScore, 'last score ',lastscore);
 if(newScore > lastscore){
  lastscore = newScore
  if(_isMoved){
    console.log('nomove')
    newMove = MOVES.T
   _isMoved = false
  }
  else{    

    console.log('nomove Attack')
    newMove = MOVES.R
    _isMoved = true
  }

  res.send(newMove);
  _lastMove = newMove
  _lastDim = dims

  return
 }
 lastscore = newScore
  console.log('dims ',JSON.stringify(dims));
  console.log('myDirection ',JSON.stringify(myDirection));
  const moves = ['F', 'L', 'R'];
  const attack  = 'T'
  if(_lastMove === 'R' || _lastMove === 'L'){
    _isTurned = false
    newMove = 'F'
    lastMovedCount++
    _isMoved = true
    totalMoves++
  _lastMove = newMove
  _lastDim = dims
    res.send(newMove);
    return
  }
  if(dims === MIN){
    if(myDirection === 'S' || myDirection === 'E'){
      newMove = MOVES.F
    }else{      
      newMove = MOVES.R
      _isTurned = true
    }
  }
  else if(dims === RIGHTMAX){
    if(myDirection === 'S' || myDirection === 'E'){
      newMove = MOVES.F
      }else{
        newMove = MOVES.R
        _isTurned = true
      }
  }
  else if(dims === MAX){
    if(myDirection === 'N' || myDirection === 'W'){
      newMove = MOVES.F
      }else{
        newMove = MOVES.R
        _isTurned = true
      }

  }
  else if(dims === BOTTOMAX){
    if(myDirection === 'N' || myDirection === 'E'){
      newMove = MOVES.F
      }else{
        newMove = MOVES.R
        _isTurned = true
      }
  }
  if(newMove && lastMovedCount<3){
    console.log('calculated')
    res.send(newMove);
    lastMovedCount++
    totalMoves++
    _isMoved = true
  }
  else if(lastMovedCount==0){
    if(dims[0]>=12 && dims[1]<=3){
      newMove = MOVES.R
      lastMovedCount++
      totalMoves++
      _isMoved = true
      _isTurned = true
    }
    else if(dims[0]<=3 && dims[1]<=3){
      newMove = MOVES.R
      lastMovedCount++
      totalMoves++
      _isMoved = true
      _isTurned = true
    }

    else if(dims[0]<=3 && dims[1]<=12){
      newMove = MOVES.L
      lastMovedCount++
      totalMoves++
      _isMoved = true
      _isTurned = true
    }

    else if(dims[0]<=12 && dims[1]<=12){
      newMove = MOVES.R
      lastMovedCount++
      totalMoves++
      _isMoved = true
      _isTurned = true
    }}
   
  if(newMove){

    // moves[Math.floor(Math.random() * moves.length)]
    lastMovedCount++
    _isMoved = true
    totalMoves++
    res.send(newMove);
    }

  else{
    if(lastscore>newScore){
      newMove = moves[Math.floor(Math.random() * moves.length)]
      lastMovedCount++
      _isMoved = true
      totalMoves++
    res.send(newMove);
    }
    else{
      console.log('attack')
      lastMovedCount = 0
      _isMoved = false
      totalAttacks++
      res.send(attack);
    }
  }
  _lastMove = newMove
  _lastDim = dims
  }
  
  // TODO add your implementation here to replace the random response
);

app.listen(process.env.PORT || 8080);
