import { Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Landing, { Names } from './screens/Landing';
import GameBoard, { Winner } from './screens/Landing/GameBoard';

function App() {

  const [screen, setScreen] = useState<'form' | 'game' | 'over'>('form');

  const [names, setNames] = useState<Names>();
  
  const [winner, setWinner] = useState<Winner>(-1);
  const [gameCompleted, setGameCompleted] = useState(false);

  const onNamesSubmit = (names: Names ) => {
    setScreen('game');
    setNames(names);
  }

  const handleComplete = (winner: Winner) => {
    setWinner(winner);
    setGameCompleted(true);
    setScreen('over');
  }

  const handleReset = () => {
    setScreen('form');
    setNames(undefined);
    setGameCompleted(false);
  }

  const handleRestart = () => {
    setScreen('game');
    setGameCompleted(false);
  }

  return (
    <BrowserRouter>
      {screen === 'form' ? <Landing onSubmit={onNamesSubmit} /> : null}
      {screen === 'game' && names ? <GameBoard onCompleted={handleComplete} name1={names?.name1} name2={names?.name2} /> : null}
      {screen === 'over' ? 
        <div>
          {
            gameCompleted && names ?
              <>
                {
                  winner === -1 ?
              <div>
                  <Typography>Game Over</Typography>
              </div> :
                <Typography>{winner === 1 ? names.name1 : names.name2} is winner</Typography>
                }
                <Button onClick={handleReset} >Restart</Button>
                <Button onClick={handleRestart} >Start Over</Button>
              </>
              : null
            }
        </div>
        : null
      }
    </BrowserRouter>
  );
}

export default App;
