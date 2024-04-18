"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "../public/fonts.css";
import "../public/custom-styles.css";
import { fetchRandomCard } from "./card-caller/fetch-random";
import GameTypes from "./game-types/game-type-list";
import PowTough from "./components/pow-tough";
import CardName from "./components/card-name";
import SetName from "./components/set";
import ManaValue from "./components/mana-value";
import blackManaImage from "../public/images/swamp.png";
import redManaImage from "../public/images/mountain.png";
import greenManaImage from "../public/images/forest.png";
import blueManaImage from "../public/images/island.png";
import whiteManaImage from "../public/images/plains.png";
import mtgLogo from "../public/images/mtg.png";
const manaImages = {
  B: blackManaImage,
  R: redManaImage,
  G: greenManaImage,
  U: blueManaImage,
  W: whiteManaImage,
};
export default function Page() {
  const [cardImageUrl, setCardImageUrl] = useState(null);
  const [card, setCard] = useState(null);
  const [isBlurVisible, setIsBlurVisible] = useState(true);
  const [selectedGameType, setSelectedGameType] = useState(null);
  const [manaStyle, setManaStyle] = useState("");

  const handleGetCard = async () => {
    const newCard = await fetchRandomCard();
    setCard(newCard);
  };
  function handleManaClick(manaType) {
    setManaStyle(" ");
    setManaStyle(manaType);
    console.log(manaStyle);
  }
  useEffect(() => {
    if (card) {
      console.log(card);
      if (!card.imageUrl) {
        handleGetCard();
      } else {
        setCardImageUrl(card.imageUrl);
        console.log(cardImageUrl);
      }
    }
  }, [card]);

  const gameTypes = [
    "Name",
    "Set",
    "ManaValue",
    "Rarity",
    "Type",
    "Power/Toughness",
  ];

  return (
    <main className="flex justify-center tiffany min-h-screen font-beleren">
      <div className="flex flex-col mint custom-width mt-2 rounded-lg">
        <div className="text-center custom-width mt-4 ml-20 p-4 rounded-2xl fairy-tail flex justify-center items-center">
          <Image className="mr-8 w-16 h-16" src={mtgLogo} alt="MTG Logo" />
          <h1 className="text-5xl">Guess the Gathering</h1>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-center w-10/12 ml-6 dark-pink rounded-b-xl">
            {gameTypes.map((gameType) => (
              <GameTypes
                key={gameType}
                games={gameType}
                onClick={() => setSelectedGameType(gameType)}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          {/* purple box area */}
          <div className="card-box rounded-md mt-2">
            <div className="flex flex-col w-96 ml-8">
              <div className="h-96 w-72 flex bg-gray-600 border-slate-900 border-2 p-2 m-4">
                <div className="relative">
                  {cardImageUrl && (
                    <Image
                      className="rounded-xl"
                      src={cardImageUrl}
                      alt="Card"
                      width={500}
                      height={500}
                      priority
                    />
                  )}
                  {/* positioning blur divs */}
                  {isBlurVisible && (
                    // name blur
                    <div className="absolute h-6 w-40 name-blur inset-y-1 inset-x-42 rounded-xl"></div>
                  )}
                  {isBlurVisible && (
                    //  mana value blur
                    <div className="absolute h-6 value-blur inset-y-1 inset-x-44 rounded-xl"></div>
                  )}
                  {isBlurVisible && (
                    //  card type blur
                    <div className="absolute h-6 type-blur inset-y-12 inset-x-42 rounded-xl"></div>
                  )}
                  {isBlurVisible && (
                    //  set symbol blur
                    <div className="absolute h-6 set-symbol-blur inset-y-12 inset-x-44 rounded-xl"></div>
                  )}
                  {isBlurVisible && (
                    //  rule text type blur
                    <div className="absolute rule-text-blur inset-y-12 inset-x-42 rounded-xl"></div>
                  )}
                  {isBlurVisible && (
                    //  set code blur
                    <div className="absolute h-6 set-code-blur inset-y-12 inset-x-42 rounded-xl"></div>
                  )}
                  {isBlurVisible && (
                    //  power/toughness blur
                    <div className="absolute h-6 pt-blur inset-y-12 inset-x-44 rounded-xl"></div>
                  )}
                </div>
              </div>
              {/* this section is for debugging purposes */}
              <div className="flex">
                <button
                  className="bg-slate-900 hover:bg-slate-800 w-40 text-white font-bold py-2 px-4 rounded-xl mr-16"
                  onClick={handleGetCard}
                >
                  Get Card
                </button>
                <button
                  className="bg-slate-900 hover:bg-slate-800 w-40 text-white font-bold py-2 px-4 rounded-xl"
                  onClick={() => setIsBlurVisible(!isBlurVisible)}
                >
                  Toggle Blur
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <button onClick={() => handleManaClick("swamp")}>
                <Image className="pip" src={blackManaImage} alt="Black Mana" />
              </button>
              <button onClick={() => handleManaClick("mountain")}>
                <Image className="pip" src={redManaImage} alt="Red Mana" />
              </button>
              <button onClick={() => handleManaClick("forest")}>
                <Image className="pip" src={greenManaImage} alt="Green Mana" />
              </button>
              <button onClick={() => handleManaClick("island")}>
                <Image className="pip" src={blueManaImage} alt="Blue Mana" />
              </button>
              <button onClick={() => handleManaClick("plains")}>
                <Image className="pip" src={whiteManaImage} alt="White Mana" />
              </button>
            </div>
            <div className="flex custom-width justify-center mt-16">
              {selectedGameType === "Name" && (
                <CardName card={card} handleGetCard={handleGetCard} />
              )}
              {selectedGameType === "Set" && card && (
                <SetName setCode={card.setName} handleGetSet={handleGetCard} />
              )}
              {selectedGameType === "ManaValue" && card && (
                <ManaValue manaCost={card.manaCost} />
              )}
              {selectedGameType === "Power/Toughness" && (
                <PowTough card={card} handleGetCard={handleGetCard} />
              )}
            </div>
            <div>
              {/* <Image className="pip" src={blackManaImage} alt="Black Mana" />
              <Image className="pip" src={redManaImage} alt="Red Mana" />
              <Image className="pip" src={greenManaImage} alt="Green Mana" />
              <Image className="pip" src={blueManaImage} alt="Blue Mana" />
              <Image className="pip" src={whiteManaImage} alt="White Mana" /> */}
            </div>
          </div>
        </div>
        <p> </p>
      </div>
    </main>
  );
}
