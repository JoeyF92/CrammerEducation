import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const DeckCard = ({ id, name, subject, tags, likes, image}) => {

    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(likes)
    const token = JSON.parse(localStorage.getItem("token"));
    const userId = token.user_id;

    const handleLikeUnlike = async () => {
        try {
            //toggle isLiked state
          const isLikedNow = !isLiked;
          setIsLiked(isLikedNow); 
    
          // Send requests to update likes in users and decks tables
          const userLikePromise = fetch(`http://localhost:3000/users/${userId}/decks/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ isLiked: isLikedNow }),
          });
    
          const deckLikePromise = fetch(`http://localhost:3000/decks/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ isLiked: isLikedNow}),
          });
    
          // Wait for both requests to complete
          const [userLikeResponse, deckLikeResponse] = await Promise.all([userLikePromise, deckLikePromise]);
    
          if (userLikeResponse.ok && deckLikeResponse.ok) {
            // Update the likes count on the card
            setLikesCount(isLikedNow ? likesCount + 1 : likesCount - 1);

          } else {
            console.error("Error liking/unliking deck.");
          }
        } catch (error) {
          console.error("Error liking/unliking deck.", error);
        }
      };


    return (
        <main>
        <Link to={`/decks/${id}`}>
        <div className='card'>
            <h3 className='deck-name'>{name}</h3>

            <p className='subject'>{subject}</p>
            <p className='tags'># {tags.join(', ')}</p>

            {image && <img src={image} alt={name} />}
        </div>
        </Link> <br></br>
        <div className='likes'>
        <button onClick= {handleLikeUnlike} className='like-button'>
        <FontAwesomeIcon icon="fa-solid fa-heart" size="lg" />
        </button>
        {likesCount}       
        </div>  
        </main>
    )
};

export default DeckCard;


