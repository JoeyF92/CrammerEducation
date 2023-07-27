import React, { useState, useEffect } from "react";
import { DeckFilter, DeckCard } from "../../components";
import "./styles.css";

const DecksPage = () => {
  const [decks, setDecks] = useState([]);
  const [textFilter, setTextFilter] = useState("");

  useEffect(() => {
    async function loadDecks() {
      const response = await fetch("http://localhost:3000/decks");
      const data = await response.json();
      setDecks(data);
    }

    loadDecks();
  }, []);

  function displayDecks() {
    return decks
      .filter(
        (d) =>
          textFilter.length === 0 ||
          d.name.toLowerCase().includes(textFilter.toLowerCase())
      )
      .map((d) => (
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
    <main>
      <h1>Decks</h1>
      <DeckFilter textFilter={textFilter} setTextFilter={setTextFilter} />
      <div className="deck-main">{displayDecks()}</div>
    </main>
  );
};

export default DecksPage;
