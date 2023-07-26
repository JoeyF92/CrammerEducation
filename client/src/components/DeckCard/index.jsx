import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeckCard = ({ id, name, subject, tags, likes, image }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const token = JSON.parse(localStorage.getItem("token"));
  const userId = token.user_id;

  const handleLikeUnlike = async () => {
    try {
      const isLikedNow = !isLiked;
      setIsLiked(isLikedNow);

      const userLikePromise = fetch(
        `http://localhost:3000/users/${userId}/decks/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isLiked: isLikedNow }),
        }
      );

      const deckLikePromise = fetch(`http://localhost:3000/decks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isLiked: isLikedNow }),
      });

      const [userLikeResponse, deckLikeResponse] = await Promise.all([
        userLikePromise,
        deckLikePromise,
      ]);

      if (userLikeResponse.ok && deckLikeResponse.ok) {
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
       
      <div className="card">
        {image && (
          <div
            className="background-image"
            style={{ backgroundImage: `url(${image})` }}
            alt={name}
          />
        )}
        <Link to={`/decks/${id}`}>
        <div className="card-content">
          <h3 className="deck-name">{name}</h3>
          <p className="subject">{subject}</p>
          <p className="tags"># {tags.join(", ")}</p>
        </div>
        </Link>
        <div className="likes">
        <button onClick={handleLikeUnlike} className="like-button">
          <FontAwesomeIcon icon="fa-solid fa-heart" size="lg" />
          {likesCount}
        </button>
       
      </div>
      </div>
    
      
    </main>
  );
};

export default DeckCard;
