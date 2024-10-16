import { useState, useEffect } from 'react';
import { WINNING_COMBINATIONS } from '../winning-combinations';
import GameOver from './GameOver';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({
  playerTurnHandler,
  onTurn,
  turnLogger,
  participant,
  rematchRender,
}) {
  const [gameBoardState, setGameBoardState] = localStorage.getItem('state')
    ? useState(JSON.parse(localStorage.getItem('state')))
    : useState(initialGameBoard); //useState(initialGameBoard);
  const [winner, setWinner] = useState('');
  const [counter, setCounter] = localStorage.getItem('counter')
    ? useState(JSON.parse(localStorage.getItem('counter')))
    : useState(0);

  function checkWinner(actualGameboardState) {
    const numberOfCombinations = WINNING_COMBINATIONS.length;
    for (let index = 0; index < numberOfCombinations; index++) {
      const firstBlock = WINNING_COMBINATIONS[index][0]; //example = {row: 0, column: 0}
      const secondBlock = WINNING_COMBINATIONS[index][1]; //example = {row: 0, column: 1}
      const thirdBlock = WINNING_COMBINATIONS[index][2]; //example = {row: 0, column: 2}

      if (
        actualGameboardState[firstBlock.row][firstBlock.column] === null ||
        actualGameboardState[secondBlock.row][secondBlock.column] === null ||
        actualGameboardState[thirdBlock.row][thirdBlock.column] === null
      ) {
        continue; //if null, directly check the next combination
      }

      if (
        actualGameboardState[firstBlock.row][firstBlock.column] === 'X' &&
        actualGameboardState[secondBlock.row][secondBlock.column] === 'X' &&
        actualGameboardState[thirdBlock.row][thirdBlock.column] === 'X'
      ) {
        //do something
        setWinner(participant[0].toUpperCase());
      }

      if (
        actualGameboardState[firstBlock.row][firstBlock.column] === 'O' &&
        actualGameboardState[secondBlock.row][secondBlock.column] === 'O' &&
        actualGameboardState[thirdBlock.row][thirdBlock.column] === 'O'
      ) {
        //do something
        setWinner(participant[1].toUpperCase());
      }
    }
  }

  function selectSquareHandler(row, col) {
    const newGbState = [...gameBoardState];
    newGbState[row][col] = onTurn;
    setGameBoardState(newGbState);
    playerTurnHandler();
    turnLogger(row, col, onTurn);
    checkWinner(gameBoardState);
    setCounter((prev) => prev + 1);
    localStorage.setItem('state', JSON.stringify(gameBoardState)); //test localstorage
    localStorage.setItem('onturn', onTurn === 'X' ? 'O' : 'X'); //test localstorage
    localStorage.setItem('counter', counter + 1);
    localStorage.setItem('players', JSON.stringify(participant));
  }

  function rematch() {
    const initial = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];

    setGameBoardState(initial);
    setWinner('');
    setCounter(0);
    localStorage.clear();
    rematchRender();
  }

  return (
    <>
      {(winner || counter === 9) && (
        <GameOver winner={winner} rematch={rematch} />
      )}
      <ol id="game-board">
        {gameBoardState.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button
                    onClick={() => selectSquareHandler(rowIndex, colIndex)}
                    disabled={playerSymbol !== null ? true : false}
                  >
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}
