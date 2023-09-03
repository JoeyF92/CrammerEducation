import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./styles.css";
import img from "./questions.png";
import img2 from "./target.png";
import img3 from "./qa.png";

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

  const handlePreviousCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <>
      <img src={img3} alt="QA" className="img3-1" />
      <div className="container">
        {cards.length > 0 && currentCardIndex < cards.length && (
          <div className="guess">
            Try to guess the correct answer first, and then click on the card to
            reveal the correct solution.
          </div>
        )}

        {cards.length > 0 && currentCardIndex < cards.length && (
          <div
            className={`card-box ${showAnswer ? "flip" : ""}`}
            onClick={() => setShowAnswer((prev) => !prev)}
          >
            <h2 className={`card-number ${showAnswer ? "flip" : ""}`}>
              {currentCardIndex + 1}
            </h2>
            {showAnswer ? (
              <p className="answer-label">Answer:</p>
            ) : (
              <p className="question-label">Question:</p>
            )}
            {!showAnswer ? (
              <div className="question-box" style={{ pointerEvents: "none" }}>
                <p id="question">{cards[currentCardIndex].question}</p>
                <img src={img} alt="questions" className="questions" />
              </div>
            ) : (
              <div className="answer-box" style={{ pointerEvents: "none" }}>
                <p className="answer-text">{cards[currentCardIndex].answer}</p>
                <img src={img2} alt="target" className="target" />
              </div>
            )}
          </div>
        )}

        {cards.length > 0 && currentCardIndex < cards.length && (
          <div className="button-row">
            {currentCardIndex > 0 && (
              <button className="btn" onClick={handlePreviousCard}>
                Previous Card
              </button>
            )}
            <button className="btn" onClick={handleNextCard}>
              Next Card
            </button>
          </div>
        )}

        {cards.length === 0 && <p>No cards available.</p>}

        {currentCardIndex >= cards.length && (
          <p id="finish">
            Congratulations! <br />
            You did it! Well done on completing the game with words!
            <br />
            <br />
            <Link to="/decks" id="link">
              Choose another deck
            </Link>
          </p>
        )}

        <img src={img3} alt="QA" className="img3-2" />
      </div>
    </>
  );
};

export default DeckPage;
