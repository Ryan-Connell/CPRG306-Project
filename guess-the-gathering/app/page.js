'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import '../public/fonts.css';
import { fetchRandomCard } from "./card-caller/fetch-random";

export default function Page() {
  const [cardImageUrl, setCardImageUrl] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      const imageUrl = await fetchRandomCard();
      setCardImageUrl(imageUrl);
    };

    fetchCard();
  }, []);

  return (
    <main className="flex justify-center bg-slate-600 min-h-screen">
      <div className=" bg-slate-700 h-11/12 w-7/12 border-2 border-slate-800 rounded-2xl ">
        <div className="flex flex-col justify-center items-center font-beleren">
        
          <h1 className="border-slate-800 bg-slate-700 border-2 text-4xl text-left w-11/12 mt-3 pl-16 pr-16 p-8 rounded-2xl">Guess the Gathering</h1>

        </div>
        
        {cardImageUrl && 
        <Image  src={cardImageUrl} alt="Card" width={250} height={300} />}
        
        
      </div>

    </main>
    
  );
}
