import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DeckPage = () => {
  const { id } = useParams()
  const [deck, setDeck] = useState(null)
  const [cards, setCards] = useState([])
  useEffect(() => {
    fetchDeck()
    fetchCards()
  }, [])

  const fetchDeck = async () => {
    try {
      const response = await fetch(`http://localhost:3000/decks/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch deck")
      }
      const deckData = await response.json()
      setDeck(deckData)
    } catch (error) {
      console.error("Error fetching deck:", error.message)
    }
  };

  const fetchCards = async () => {
    try {
      const response = await fetch(`http://localhost:3000/decks/${id}/cards`)
      if (!response.ok) {
        throw new Error("Failed to fetch cards")
      }
      const cardsData = await response.json()
      setCards(cardsData)
    } catch (error) {
      console.error("Error fetching cards:", error.message)
    }
  };

  return (
    <div>
      {deck ? (
        <div>
          <h1>{deck.deck_name}</h1>
          <p>Subject: {deck.subject}</p>
          <p>Tags: {deck.tags.join(", ")}</p>
          <p>Likes: {deck.likes}</p>
          {deck.image && <img src={deck.image} alt="Deck Thumbnail" />}
        </div>
      ) : (
        <p>Loading deck...</p>
      )}
      <h2>Cards:</h2>
      {cards.length === 0 ? (
        <p>No cards available.</p>
      ) : (
        <ul>
          {cards.map((card) => {
            return (
              <li key={card.id}>
                <h3>Question: {card.question}</h3>
                <p>Answer: {card.answer}</p>
                {card.image && <img src={card.image} alt="Card Image" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default DeckPage
