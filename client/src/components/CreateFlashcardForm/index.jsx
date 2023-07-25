import React, { useState } from "react";
import axios from "axios";

const CreateFlashcardForm = ({ deckId }) => {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    image: "",
  });

  console.log("Received Deck ID:", deckId);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const flashcardData = {
        question: formData.question,
        answer: formData.answer,
        image: formData.image,
        deck_id: deckId,
      };

      console.log("Flashcard Data:", flashcardData);

      const response = await axios.post(
        `http://localhost:3000/decks/${deckId}/cards`,
        flashcardData
      );

      console.log("Flashcard created:", response.data);
    } catch (error) {
      console.error("Error creating flashcard:", error.message);
    }
  };

  console.log("Deck ID:", deckId);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="question"
        value={formData.question}
        onChange={handleChange}
        placeholder="Question"
      />
      <input
        type="text"
        name="answer"
        value={formData.answer}
        onChange={handleChange}
        placeholder="Answer"
      />
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <button type="submit">Create Flashcard</button>
    </form>
  );
};

export default CreateFlashcardForm;
