import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DeckCard = ({ id, name, subject, tags, likes, image}) => {
    //need to update likes in deck table and liked in user table
    async function handleLike(id) {
        const options = {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                likes: value
            })
        }
        const response = await fetch(`http://localhost:3000/decks/${id}`, options)
        const data = await response.json();
        
    }

    return (
        <Link to={`/decks/${id}`}>
        <div className='card'>
            <h3 className='deck-name'>{name}</h3>

            <p className='subject'>{subject}</p>
            <p className='tags'># {tags.join(', ')}</p>

            <div className='likes'>
            <button onClick= {handleLike} className='like-button'>
            <FontAwesomeIcon icon="fa-solid fa-heart" size="lg" />
            </button>
            {likes}       
            </div>  

            {image && <img src={image} alt={name} />}
        </div>
        </Link>
    )
};

export default DeckCard;


