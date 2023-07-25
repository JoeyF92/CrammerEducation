import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DecksPage = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      const response = await fetch("http://localhost:3000/decks");
      if (!response.ok) {
        throw new Error("Failed to fetch decks");
      }
      const decksData = await response.json();
      setDecks(decksData);
    } catch (error) {
      console.error("Error fetching decks:", error.message);
    }
  };

  return (
    <div>
      <h1>All Decks</h1>
      {decks.length === 0 ? (
        <p>No decks available.</p>
      ) : (
        <ul>
          {decks.map((deck) => (
            <li key={deck.id}>
              <Link to={`/decks/${deck.id}`}>
                <h2>{deck.name}</h2>
              </Link>
              <p>Subject: {deck.subject}</p>
              <p>Tags: {deck.tags.join(", ")}</p>
              <p>Likes: {deck.likes}</p>
              {deck.image && <img src={deck.image} alt="Deck Thumbnail" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DecksPage;
