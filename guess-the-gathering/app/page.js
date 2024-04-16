"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "../public/fonts.css";
import "../public/custom-styles.css";
import { fetchRandomCard } from "./card-caller/fetch-random";
import GameTypes from "./game-types/game-type-list";

export default function Page() {
  const [cardImageUrl, setCardImageUrl] = useState(null);
  const [card, setCard] = useState(null);
  const [isBlurVisible, setIsBlurVisible] = useState(true);

  const handleGetCard = async () => {
    const newCard = await fetchRandomCard();
    setCard(newCard);
  };

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
    "The Name",
    "The Set",
    "The Colour",
    "The Mana Value",
    "The Rarity",
    "The Type",
    "The Power/Toughness",
    "The Keyword(s)",
  ];

  return (
    <main className="flex justify-center tiffany min-h-screen font-beleren">
      <div className="mint h-11/12 custom-width mt-2 rounded-lg">
        <div className="flex flex-col justify-center items-center">
          <h1 className="border-slate-800 border-2 text-5xl text-center w-11/12 mt-4 pr-16 p-8 rounded-2xl fairy-tail">
            Guess the Gathering
          </h1>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-center w-10/12 dark-pink rounded-b-xl">
            {gameTypes.map((gameType) => (
              <GameTypes games={gameType} />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="custom-height custom-width card-box rounded-md mt-2">
            <div className="flex flex-col w-96 justify-center ml-8">
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
              <div className="flex justify-center">
                <button
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl mr-20"
                  onClick={handleGetCard}
                >
                  Get Card
                </button>
                <button
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl mr-20"
                  onClick={() => setIsBlurVisible(!isBlurVisible)}
                >
                  Toggle Blur
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
