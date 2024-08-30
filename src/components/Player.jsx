import { useState } from 'react';

export default function Player({ playerName, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(playerName);

  function btnHandler() {
    setIsEditing(!isEditing);
  }

  function onChangeHandler(event) {
    setName(event.target.value);
  }

  let player = <span className="player-name">{name}</span>;
  let buttonCaption = 'Edit';

  if (isEditing) {
    player = (
      <input type="text" required value={name} onChange={onChangeHandler} />
    );
    buttonCaption = 'Save';
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {player}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={btnHandler}>{buttonCaption}</button>
    </li>
  );
}
