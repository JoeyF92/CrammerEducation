import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import img from "./qa.png";

const CreateFlashcardForm = ({ deckId, cards }) => {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const flashcardData = {
        question: formData.question,
        answer: formData.answer,
        deck_id: deckId,
      };

      console.log("Flashcard Data:", flashcardData);

      const response = await axios.post(
        `http://localhost:3000/decks/${deckId}/cards`,
        flashcardData
      );

      console.log("Flashcard created:", response.data);

      setFormData({
        question: "",
        answer: "",
      });
    } catch (error) {
      console.error("Error creating flashcard:", error.message);
    }
  };

  console.log("Deck ID:", deckId);

  return (
    <>
      <img src={img} alt="Q&A" className="qa2-image" />
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          name="question"
          value={formData.question}
          onChange={handleChange}
          placeholder="Question"
        />
        <br />
        <textarea
          type="text"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          placeholder="Answer"
        />
        <div className="row">
          <button type="submit">Create Flashcard</button>
          <Link to="/decks" id="create">
            Complete deck
          </Link>
        </div>
      </form>
      <img src={img} alt="Q&A" className="qa1-image" />
    </>
  );
};

export default CreateFlashcardForm;
