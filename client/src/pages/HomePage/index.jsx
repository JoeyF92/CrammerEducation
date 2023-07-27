import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { DeckCard } from "../../components";
import "./homepage.css"

export default function HomePage() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    async function loadTrending() {
      //this route already orders the decks by number of likes
      const response = await fetch(`http://localhost:3000/decks`)
      const data = await response.json()
      const trendingDecks = data.slice(0,6);
      setTrending(trendingDecks)
    }
    loadTrending()
  }, [])

  function displayTrending() {
    return trending
    .map(d => 
      <DeckCard
      key={d.id} 
          id={d.id} 
          name={d.name}
          subject={d.subject}
          tags={d.tags}
          likes={d.likes}
          image={d.image} 
      />
    )
  }

  return (
    <div>
      <div className="deck-browse">
        <Link to="/decks">
          <div className="browse-card">
            <div className="browse-card-content">
            <h3>Browse Flashcards</h3>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size="2xl" />
          </div>
          </div>
        </Link>

        <Link to="/myflashcards">
          <div className="browse-card">
          <div className="browse-card-content">
            <h3>My Flashcards</h3>
            <FontAwesomeIcon icon="fa-solid fa-layer-group" size="2xl"/>
          </div>
          </div>
        </Link>

        <Link to="/createdeck">
          <div className="browse-card">
          <div className="browse-card-content">
            <h3>Create Flashcards</h3>
            <FontAwesomeIcon icon="fa-solid fa-plus" size="2xl" />
          </div>
          </div>
        </Link>
      </div>

      <h2 className="trending">Trending</h2>
        <div className="deck-main">
          {displayTrending()}
        </div>
      </div>
    
  );
}
