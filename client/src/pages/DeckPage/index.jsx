import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

const DeckPage = () => {
  const { id } = useParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetchDeck();
    fetchCards();
  }, []);

  const fetchDeck = async () => {
    try {
      const response = await fetch(`http://localhost:3000/decks/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch deck");
      }
      const deckData = await response.json();
      setDeck(deckData);
    } catch (error) {
      console.error("Error fetching deck:", error.message);
    }
  };

  const fetchCards = async () => {
    try {
      const response = await fetch(`http://localhost:3000/decks/${id}/cards`);
      if (!response.ok) {
        throw new Error("Failed to fetch cards");
      }
      const cardsData = await response.json();
      setCards(cardsData);
    } catch (error) {
      console.error("Error fetching cards:", error.message);
    }
  };

  const handleRevealAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div>
      {deck ? (
        <div>
          Try to guess the correct answer first, and then click on the card to
          reveal the correct solution.
        </div>
      ) : (
        <p>Loading deck...</p>
      )}

      {cards.length > 0 && currentCardIndex < cards.length && (
        <div className="card-box">
          <h2>Card {currentCardIndex + 1}</h2>
          {!showAnswer ? (
            <div className="question-box" onClick={handleRevealAnswer}>
              <p>Question: {cards[currentCardIndex].question}</p>
            </div>
          ) : (
            <div className="answer-box">
              <p>Answer: {cards[currentCardIndex].answer}</p>
            </div>
          )}
        </div>
      )}

      {cards.length > 0 && currentCardIndex < cards.length && (
        <button onClick={handleNextCard}>Next Card</button>
      )}

      {cards.length === 0 && <p>No cards available.</p>}
      {currentCardIndex >= cards.length && (
        <p>
          No more cards available...
          <br />
          <Link to="/decks">Choose another deck</Link>
        </p>
      )}
    </div>
  );
};

export default DeckPage;
