import { useState, useEffect } from "react";

export default function PowTough({ card, handleGetCard }) {
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [powerGuess, setPowerGuess] = useState(0);
  const [toughnessGuess, setToughnessGuess] = useState(0);
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);
  useEffect(() => {
    if (!card) {
      initializeGame();
    }
  }, []);
  const initializeGame = () => {
    handleGetCard();
    setPowerGuess(0);
    setRemainingAttempts(3);
    setToughnessGuess(0);
    setResult("");
    setShowResult(false);
  };

  const checkGuess = () => {
    // Decrement remainingAttempts
    setRemainingAttempts(remainingAttempts - 1);
    const powerResult =
      powerGuess > card.power
        ? "high"
        : powerGuess < card.power
        ? "low"
        : "correct";
    const toughnessResult =
      toughnessGuess > card.toughness
        ? "high"
        : toughnessGuess < card.toughness
        ? "low"
        : "correct";
    setResult(`Power: ${powerResult}, Toughness: ${toughnessResult}`);
    // Check if both guesses are correct
    if (powerResult === "correct" && toughnessResult === "correct") {
      setShowResult(true);
    }

    // Check if remainingAttempts has hit 0
    if (remainingAttempts === 0) {
      initializeGame();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-green-200 text-center text-2xl">
        Guess the Power/Toughness
      </h1>
      <div className="mt-4">
        <input
          className="text-black text-center w-12 mr-1 border-2 border-slate-800 rounded-xl"
          type="number"
          min="0"
          value={powerGuess}
          onChange={(e) => setPowerGuess(e.target.value)}
          placeholder="Guess Power"
        />
        /
        <input
          className="text-black text-center w-12 ml-1 border-2 border-slate-800 rounded-xl"
          type="number"
          min="0"
          value={toughnessGuess}
          onChange={(e) => setToughnessGuess(e.target.value)}
          placeholder="Guess Toughness"
        />
      </div>
      {!showResult && (
        <button
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl mt-4"
          onClick={checkGuess}
        >
          Check Guess
        </button>
      )}

      {(showResult || remainingAttempts === 0) && (
        <button
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl mt-4"
          onClick={initializeGame}
        >
          Next Card
        </button>
      )}
      <p className="text-black text-center mt-4">{result}</p>
      <p className="text-black text-center mt-4">
        Remaining Attempts: {remainingAttempts}
      </p>
      {showResult && (
        <div className="flex justify-center bg-gray-300 mt-4 p-2 rounded-lg">
          <p className="text-black text-center">{card.power}</p>
          <p className="text-black text-center ml-1 mr-1">/</p>
          <p className="text-black text-center">{card.toughness}</p>
        </div>
      )}
    </div>
  );
}
