import React, { useState, useEffect } from "react";
import Image from "next/image";

const manaImages = {
  B: "/images/swamp.png",
  R: "/images/mountain.png",
  G: "/images/forest.png",
  U: "/images/island.png",
  W: "/images/plains.png",
};

export default function ManaValue({
  manaCost,
  selectedGameType,
  handleManaClick,
  loadNewCard,
}) {
  const [selectedManaCounts, setSelectedManaCounts] = useState({}); // State to track number of selected mana for each type
  const [feedback, setFeedback] = useState(""); // State to provide feedback to the user
  const [attemptsRemaining, setAttemptsRemaining] = useState(5); // State to track remaining attempts

  useEffect(() => {
    if (manaCost) {
      const chars = Array.from(manaCost.replace(/{|}/g, "_"));
      setSelectedManaCounts({});
      setAttemptsRemaining(5); // Reset attempts on new card load
    }
  }, [manaCost]);

  // Handle mana click
  const handleManaTypeClick = (manaType) => {
    setSelectedManaCounts((prevCounts) => ({
      ...prevCounts,
      [manaType]: (prevCounts[manaType] || 0) + 1,
    }));
  };

  // Reset selected mana counts
  const resetManaCounts = () => {
    setSelectedManaCounts({});
  };

  // Check the user's guess against the actual mana cost
  const checkGuess = () => {
    let correct = true;
    // Check colorless mana guess
    const colorlessManaCount = parseInt(
      manaCost.match(/\{\d+\}/g)?.[0].slice(1, -1) || 0
    );
    const userColorlessManaCount = selectedManaCounts["C"] || 0;
    if (userColorlessManaCount !== colorlessManaCount) {
      if (userColorlessManaCount > colorlessManaCount) {
        setFeedback("Your colorless mana guess is too high.");
      } else {
        setFeedback("Your colorless mana guess is too low.");
      }
      correct = false;
    }
    // Check selected mana counts
    for (const [manaType, count] of Object.entries(selectedManaCounts)) {
      if (manaType !== "C") {
        const expectedCount = manaCost.split(manaType).length - 1;
        if (count !== expectedCount) {
          setFeedback(`Incorrect number of ${manaType} mana.`);
          correct = false;
        }
      }
    }
    // If all checks pass, display success message and load a new card
    if (correct) {
      setFeedback("Congratulations! You guessed it right!");
      loadNewCard();
    } else {
      // Decrease attempts if the guess is incorrect
      setAttemptsRemaining((prevAttempts) => prevAttempts - 1);
      // Check if attempts are expired and load a new card
      if (attemptsRemaining === 1) {
        setFeedback("Out of attempts. Loading a new card.");
        setTimeout(() => {
          loadNewCard();
        }, 2000); // Wait for 2 seconds before loading a new card
      }
    }
  };

  return (
    <div
      className="mana-value"
      style={{ display: selectedGameType === "ManaValue" ? "block" : "none" }}
    >
      <div className="mana-buttons">
        {/* Buttons for selecting mana types */}
        {Object.entries(manaImages).map(([manaType, manaImage]) => (
          <div key={manaType} className="mana-button-container">
            <button
              className="mana-button"
              onClick={() => handleManaTypeClick(manaType)}
            >
              <Image
                className="pip"
                src={manaImage}
                alt={`${manaType} Mana`}
                width={40}
                height={40}
              />
            </button>
            {/* Display mana count */}
            <div className="mana-count">
              {selectedManaCounts[manaType] || 0}
            </div>
          </div>
        ))}
        {/* Grey button for colorless mana */}
        <button
          className="mana-button colorless-button"
          onClick={() => handleManaTypeClick("C")}
        >
          C
        </button>
        <div className="mana-count">{selectedManaCounts["C"] || 0}</div>
      </div>
      {/* Feedback for the user */}
      <div className="feedback">{feedback}</div>
      {/* Buttons container */}
      <div className="buttons-container">
        {/* Button to check the guess */}
        <button className="check-button" onClick={checkGuess}>
          Check Guess
        </button>
        {/* Button to reset mana counts */}
        <button className="reset-button" onClick={resetManaCounts}>
          Reset Mana Counts
        </button>
      </div>
      {/* Display remaining attempts */}
      <div className="attempts-remaining">
        Attempts Remaining: {attemptsRemaining}
      </div>
      <style jsx>{`
        .mana-value {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: black; /* Set text color to black */
        }
        .mana-buttons {
          display: flex;
          flex-direction: row; /* Align buttons in a horizontal row */
          flex-wrap: wrap; /* Wrap buttons to next line if needed */
          justify-content: center; /* Center align buttons horizontally */
          margin-bottom: 10px;
        }
        .mana-button-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 10px;
        }
        .mana-button {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin-bottom: 5px;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
        }
        .colorless-button {
          background-color: #ccc; /* Grey color for colorless mana button */
        }
        .mana-count {
          margin-top: 5px;
          font-size: 14px;
          font-weight: bold;
        }
        .feedback {
          margin-top: 10px;
          font-weight: bold;
        }
        .buttons-container {
          display: flex;
          justify-content: center; /* Center align buttons horizontally */
        }
        .check-button,
        .reset-button {
          margin-top: 10px;
          margin-right: 10px;
          padding: 8px 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }
        .check-button {
          background-color: #007bff;
          color: white;
        }
        .reset-button {
          background-color: #dc3545;
          color: white;
        }
        .attempts-remaining {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
