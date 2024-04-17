import { useState } from "react";

export default function PowTough({ card, onClick }) {
  const [powerGuess, setPowerGuess] = useState(0);
  const [toughnessGuess, setToughnessGuess] = useState(0);
  const [result, setResult] = useState("");

  const checkGuess = () => {
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

      <button
        className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl mt-4"
        onClick={checkGuess}
      >
        Check Guess
      </button>
      <p className="text-black text-center mt-4">{result}</p>
      <div className="flex">
        <h1 className="invisible">Power: {card.power}</h1>
        <h1 className="invisible">Toughness: {card.toughness}</h1>
      </div>
    </div>
  );
}
