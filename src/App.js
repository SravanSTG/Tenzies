import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./index.css";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const heldDice = dice.filter((die) => die.isHeld);

    const checkEqual =
      heldDice.length === 10 &&
      heldDice.every((num) => num.value === heldDice[0].value);

    if (checkEqual) {
      setTenzies(true);
      console.log("You won");
    }
  }, [dice]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      number={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld
            ? die
            : {
                value: Math.floor(Math.random() * 6 + 1),
                isHeld: false,
                id: nanoid(),
              };
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <main>
      <div className="instruction-box">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="container">{diceElements}</div>
      <button className="roll-btn" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      {tenzies && <Confetti />}
    </main>
  );
}

export default App;
