import React, { useState, useEffect } from "react";

export default function ManaValue({ manaCost }) {
  const [manaValueChars, setManaValueChars] = useState([]);

  useEffect(() => {
    if (manaCost) {
      const chars = Array.from(manaCost.replace(/{|}/g, "_"));
      setManaValueChars(chars);
    }
  }, [manaCost]);

  // Define colors for each mana type
  const manaColors = {
    B: "black",
    R: "red",
    G: "green",
    U: "blue",
    W: "white",
  };

  // Define labels for each mana type
  const manaLabels = {
    B: "Swamp",
    R: "Mountain",
    G: "Forest",
    U: "Island",
    W: "Plains",
  };

  return (
    <div className="mana-value">
      <div className="mana-cost">{manaCost}</div>
      {Object.keys(manaColors).map((color) => (
        <button
          key={color}
          className="mana-button"
          style={{
            backgroundColor: manaColors[color],
            color: manaColors[color] === "white" ? "black" : "white",
          }}
          disabled={!manaCost.includes(color)}
        >
          {manaLabels[color]}
        </button>
      ))}
      <style jsx>{`
        .mana-value {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .mana-cost {
          margin-bottom: 10px;
        }
        .mana-button {
          width: 120px;
          height: 40px;
          border-radius: 20px;
          margin: 5px;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
