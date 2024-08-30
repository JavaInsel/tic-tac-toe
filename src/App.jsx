import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';

function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  const [turnsLog, setTurnsLog] = useState([]);

  function activePlayerHandler() {
    setActivePlayer(activePlayer === 'X' ? 'O' : 'X');
  }

  function logTurns(row, col, player) {
    const newTurnsLog = [...turnsLog];
    newTurnsLog.unshift({ coor: `${row},${col}`, pl: player });
    setTurnsLog(newTurnsLog);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            playerName="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
          />
          <Player
            playerName="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
          />
        </ol>

        <GameBoard
          playerTurnHandler={activePlayerHandler}
          onTurn={activePlayer}
          turnLogger={logTurns}
        />
      </div>
      <Log stepsLog={turnsLog} />
    </main>
  );
}

export default App;
