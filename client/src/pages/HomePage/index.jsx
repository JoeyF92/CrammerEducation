import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default function HomePage() {
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
      <Link to="/">
          <div className="card">
            <h2>Trending Deck</h2>
          </div>
        </Link>

        <Link to="/">
          <div className="card">
            <h2>Trending Deck</h2>
          </div>
        </Link>

        <Link to="/">
          <div className="card">
            <h2>Trending Deck</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}
