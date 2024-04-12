"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import "../public/fonts.css";
import { fetchRandomCard } from "./card-caller/fetch-random";
import GameTypes from "./game-types/game-type-list";

export default function Page() {
  const [cardImageUrl, setCardImageUrl] = useState(null);
  const [card, setCard] = useState(null);
  const [foundCard, setFoundCard] = useState(false);
  const fetched = useRef(false);

  const fetchCard = async () => {
    if (!fetched.current) {
      const fetchedCard = await fetchRandomCard();
      setCard(fetchedCard);
      fetched.current = true;
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);

  useEffect(() => {
    if (card) {
      console.log(card);
      setCardImageUrl(card.imageUrl);
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

  // useEffect(() => {
  //   fetchCard();
  //   setFoundCard(true);
  // }, []);

  // useEffect(() => {
  //   if (foundCard) {
  //     console.log("Card found");
  //     if (card) {
  //       console.log(card);
  //       setCardImageUrl(card.imageUrl);
  //       console.log(cardImageUrl);
  //     }
  //   }
  // }, [card]);

  return (
    <main className="tiffany min-h-screen font-beleren">
      <div className="">
        <div className="flex flex-col justify-center items-center">
          <h1 className="border-slate-800 border-2 text-5xl text-center w-11/12 mt-3 pr-16 p-8 rounded-2xl fairy-tail">
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
      </div>
      <div className="custom-height custom-width card-box ml-44 rounded-md mt-2">
        <div className="flex justify-start ml-8">
          <div className="h-96 w-72 bg-gray-600 border-slate-900 border-2 p-2 m-4">
            <div>
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
