"use client";

import { useState, useEffect } from "react";

const quotes = [
  "To plant a garden is to believe in tomorrow. — Audrey Hepburn",
  "Gardening adds years to your life and life to your years.",
  "The glory of gardening: hands in the dirt, head in the sun, heart with nature.",
  "Gardens are not made by sitting in the shade. — Rudyard Kipling",
  "A garden is a friend you can visit any time.",
];

export default function GardeningQuotes() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="mt-20 text-center container-box">
      <h2 className="text-xl font-semibold">Gardening Inspiration</h2>
      <p className="text-lg italic mt-4">{quote}</p>
    </div>
  );
}
