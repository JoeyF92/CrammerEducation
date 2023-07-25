import React from 'react';
import { Link } from 'react-router-dom';

const DeckCard = ({ id, name, subject, tags, likes, image }) => {
  return (
    <div className='deck-card'>
      <Link to={`/decks/${id}`}>
        <h3>{name}</h3>
        <img src={image} alt={name} />
        <p>Subject: {subject}</p>
        <p>Tags: {tags.join(', ')}</p>
        <p>Likes: {likes}</p>
      </Link>
    </div>
  )
}

export default DeckCard;


