import { useState, useEffect } from "react";

export default function SetName({ setCode, handleGetSet }) {
  const [guesses, setGuesses] = useState([]);
  const [result, setResult] = useState("");
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [showSetName, setShowSetName] = useState(false);
  const [isCorrectSet, setIsCorrectSet] = useState(false); // New state variable

  useEffect(() => {
    initializeGame();
  }, [setCode]);

  const initializeGame = () => {
    if (!setCode) {
      return;
    }
    const formattedGuesses = Array(setCode.length).fill("_");
    setGuesses(formattedGuesses);
    setResult("");
    setRemainingAttempts(3);
    setGuessedLetters([]);
    setShowSetName(false);
    setIsCorrectSet(false); // Reset the correct set state
  };

  const handleLetterClick = (letter) => {
    const lowerCaseLetter = letter.toLowerCase();
    if (!setCode) {
      return;
    }
    if (!guessedLetters.includes(lowerCaseLetter)) {
      setGuessedLetters([...guessedLetters, lowerCaseLetter]);
      if (setCode.toLowerCase().includes(lowerCaseLetter)) {
        const newGuesses = [...guesses];
        for (let i = 0; i < setCode.length; i++) {
          if (setCode[i].toLowerCase() === lowerCaseLetter) {
            newGuesses[i] = setCode[i].toUpperCase();
          }
        }
        setGuesses(newGuesses);
        if (newGuesses.join("") === setCode.toUpperCase()) {
          setResult("Congratulations! You guessed it right!");
          setShowSetName(true);
          setIsCorrectSet(true); // Set correct set state to true
          setTimeout(() => {
            handleGetSet(); // Reset the game after a delay
          }, 2000);
        }
      } else {
        setRemainingAttempts((prevAttempts) => prevAttempts - 1);
        if (remainingAttempts === 1) {
          setResult("Game over! You're out of attempts.");
          setShowSetName(true);
          setTimeout(() => {
            handleGetSet(); // Reset the game after a delay
          }, 2000);
        } else {
          setResult("Incorrect guess!");
        }
      }
    } else {
      setResult("You've already guessed this letter.");
    }
  };

  const renderHangmanWord = () => {
    return (
      <div className="hangman-word">
        {guesses.map((letter, index) => (
          <span key={index} className="mr-1 hangman-letter">
            {letter}
          </span>
        ))}
      </div>
    );
  };

  const renderAlphabet = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
    return (
      <div
        className="alphabet"
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {alphabet.split("").map((letter, index) => (
          <button
            key={index}
            onClick={() => handleLetterClick(letter)}
            className="letter-button"
            disabled={
              guessedLetters.includes(letter.toLowerCase()) || showSetName
            }
            style={{
              backgroundColor: guessedLetters.includes(letter.toLowerCase())
                ? setCode.toLowerCase().includes(letter)
                  ? "#4CAF50"
                  : "#FF0000"
                : "#cccccc",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              margin: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
            }}
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-green-200 text-center text-2xl">
        Guess the Set Code
      </h1>
      <div className="mt-4">{renderHangmanWord()}</div>
      <div className="mt-4">{renderAlphabet()}</div>
      <p className="text-black text-center mt-4">{result}</p>
      <p className="text-black text-center mt-4">
        Remaining Attempts: {remainingAttempts}
      </p>
      {showSetName && (
        <div className="mt-4">
          <p className="text-black text-center">
            {isCorrectSet ? (
              <>
                Congratulations! You guessed the correct set:{" "}
                {setCode.toUpperCase()}
              </>
            ) : (
              <>The correct set code is: {setCode.toUpperCase()}</>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
