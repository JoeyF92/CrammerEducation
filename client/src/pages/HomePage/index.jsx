import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { DeckCard } from "../../components";

export default function HomePage() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    async function loadTrending() {
      //this route already orders the decks by number of likes
      const response = await fetch(`http://localhost:3000/decks`)
      const data = await response.json()
      const trendingDecks = data.slice(0,3);
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
      <div className="navigation-card">
        <Link to="/decks">
          <div className="card">
            <h2>Browse Flashcards</h2>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size="lg" />
          </div>
        </Link>

        <Link to="/myflashcards">
          <div className="card">
            <h2>My Flashcards</h2>
            <FontAwesomeIcon icon="fa-solid fa-layer-group" size="lg"/>
          </div>
        </Link>

        <Link to="/users/create">
          <div className="card">
            <h2>Create Flashcards</h2>
            <FontAwesomeIcon icon="fa-solid fa-plus" size="lg" />
          </div>
        </Link>
      </div>

      <h2 className="trending">Trending</h2>
        <div className="navigation-card">
          {displayTrending()}
        </div>
      </div>
    
  );
}
