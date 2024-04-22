import React, { useState, useEffect } from "react";

export default function Type({ card, handleGetCard }) {
  const [selectedType, setSelectedType] = useState(""); // State to store the selected type
  const [attempts, setAttempts] = useState(3); // State to track the remaining attempts
  const [result, setResult] = useState(""); // State to display the result

  // Array of possible card types
  const cardTypes = [
    "Artifact",
    "Creature",
    "Enchantment",
    "Land",
    "Instant",
    "Sorcery",
    "Multi-type symbol",
    "Planeswalker",
  ];

  // Function to handle the selection of card type
  const handleTypeSelection = (event) => {
    setSelectedType(event.target.value);
  };

  // Function to handle the user's guess
  const handleGuess = () => {
    if (selectedType === card.type) {
      setResult("Congratulations! You guessed it right!");
      setTimeout(() => {
        handleGetCard(); // Fetch a new card after a delay
      }, 2000);
    } else {
      setAttempts((prevAttempts) => prevAttempts - 1);
      if (attempts === 1) {
        setResult(`Game over! The correct card type is ${card.type}.`);
        setTimeout(() => {
          handleGetCard(); // Fetch a new card after a delay
        }, 2000);
      } else {
        setResult("Incorrect guess! Please try again.");
      }
    }
  };

  // Reset state when a new card loads
  useEffect(() => {
    setSelectedType("");
    setAttempts(3);
    setResult("");
  }, [card]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Guess the Card Type</h2>
      <div className="mb-4">
        <select
          value={selectedType}
          onChange={handleTypeSelection}
          className="px-3 py-2 border rounded-md"
          style={{ color: "black" }} // Set text color to black
        >
          <option value="">Select a card type</option>
          {cardTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleGuess}
        disabled={!selectedType || attempts === 0}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Guess
      </button>
      <p className="text-lg mt-4">{result}</p>
      <p className="text-lg mt-4">Remaining attempts: {attempts}</p>
    </div>
  );
}