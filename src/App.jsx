import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';

function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  const [turnsLog, setTurnsLog] = useState([]);
  const [participant, setParticipant] = useState(['Player 1', 'Player 2']);

  function activePlayerHandler() {
    setActivePlayer(activePlayer === 'X' ? 'O' : 'X');
  }

  function logTurns(row, col, player) {
    const newTurnsLog = [...turnsLog];
    newTurnsLog.unshift({ coor: `${row},${col}`, pl: player });
    setTurnsLog(newTurnsLog);
  }

  function confirmParticipant(symbol, name) {
    console.log(`I'm player ${name}, symbol: ${symbol}`);
    if (symbol === 'X') {
      const newParticipant = [...participant];
      newParticipant[0] = name;
      setParticipant(newParticipant);
    } else {
      const newParticipant = [...participant];
      newParticipant[1] = name;
      setParticipant(newParticipant);
    }
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            playerName={participant[0]}
            symbol="X"
            isActive={activePlayer === 'X'}
            setParticipation={confirmParticipant}
          />
          <Player
            playerName={participant[1]}
            symbol="O"
            isActive={activePlayer === 'O'}
            setParticipation={confirmParticipant}
          />
        </ol>

        <GameBoard
          playerTurnHandler={activePlayerHandler}
          onTurn={activePlayer}
          turnLogger={logTurns}
          participant={participant}
        />
      </div>
      <Log stepsLog={turnsLog} />
    </main>
  );
}

export default App;
