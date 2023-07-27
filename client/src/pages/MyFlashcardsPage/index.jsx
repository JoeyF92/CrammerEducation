import React, { useState, useEffect } from "react";
import { DeckCard } from "../../components";

export default function MyFlashcardsPage() {
  const [likedDecks, setLikedDecks] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const id = token.user_id;
  const [madeByYou, setMadeByYou] = useState([]);

  useEffect(() => {
    async function loadLiked() {
      const response = await fetch(`http://localhost:3000/users/${id}/liked`);
      const data = await response.json();
      if (data !== likedDecks) {
        setLikedDecks(data);
      }
    }
    loadLiked();
  }, [likedDecks]);

  useEffect(() => {
    async function loadMadeByYou() {
      const response = await fetch(`http://localhost:3000/decks`);
      const decks = await response.json();
      const filteredDecks = decks.filter((deck) => deck.user_id == id);
      setMadeByYou(filteredDecks);
    }
    loadMadeByYou();
  }, []);

  function displayLiked() {
    return likedDecks.map((d) => (
      <DeckCard
        key={d.id}
        id={d.id}
        name={d.name}
        subject={d.subject}
        tags={d.tags}
        likes={d.likes}
      />
    ));
  }

  function displayMadeByYou() {
    return madeByYou.map((d) => (
      <DeckCard
        key={d.id}
        id={d.id}
        name={d.name}
        subject={d.subject}
        tags={d.tags}
        likes={d.likes}
      />
    ));
  }

  return (
    <main className="deck-main">
      <div className="deck-section-liked">
        <h1>Liked Decks</h1>
        <div className="deck-holder">{displayLiked()}</div>
      </div>
      <div className="deck-section">
        <h1>Made by you</h1>
        <div className="deck-holder">{displayMadeByYou()}</div>
      </div>
    </main>
  );
}
