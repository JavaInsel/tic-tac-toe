import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';

function App() {
  const [activePlayer, setActivePlayer] = localStorage.getItem('onturn')
    ? useState(localStorage.getItem('onturn'))
    : useState('X');
  const [turnsLog, setTurnsLog] = localStorage.getItem('turnsLog')
    ? useState(JSON.parse(localStorage.getItem('turnsLog')))
    : useState([]);
  const [participant, setParticipant] = localStorage.getItem('players')
    ? useState(JSON.parse(localStorage.getItem('players')))
    : useState(['Player 1', 'Player 2']);

  function activePlayerHandler() {
    setActivePlayer(activePlayer === 'X' ? 'O' : 'X');
  }

  function logTurns(row, col, player) {
    const newTurnsLog = [...turnsLog];
    const playerName = player === 'X' ? participant[0] : participant[1];
    newTurnsLog.unshift({
      coor: `${row},${col}`,
      pl: playerName.toUpperCase(),
    });
    localStorage.setItem('turnsLog', JSON.stringify(newTurnsLog));
    setParticipant(participant); //also set Participant directly after clicking the game
    setTurnsLog(newTurnsLog);
  }

  function confirmParticipant(symbol, name) {
    console.log(`I'm player ${name}, symbol: ${symbol}`);
    if (symbol === 'X') {
      const newParticipant = [...participant];
      newParticipant[0] = name;
      setParticipant(newParticipant);
      localStorage.setItem('players', JSON.stringify(newParticipant));
    } else {
      const newParticipant = [...participant];
      newParticipant[1] = name;
      setParticipant(newParticipant);
      localStorage.setItem('players', JSON.stringify(newParticipant));
    }
  }

  function renderAfterRematch() {
    setActivePlayer('X');
    setTurnsLog([]);
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
          rematchRender={renderAfterRematch}
        />
      </div>
      <Log stepsLog={turnsLog} />
    </main>
  );
}

export default App;
