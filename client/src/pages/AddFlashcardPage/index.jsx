import React from "react";
import { useParams } from "react-router-dom";
import { CreateFlashcardForm } from "../../components";

const AddFlashcardPage = () => {
  const { deckId } = useParams();

  return (
    <div>
      <h1>Add Flashcard Page</h1>
      <p>Deck ID: {deckId}</p>
      <CreateFlashcardForm deckId={deckId} />
    </div>
  );
};

export default AddFlashcardPage;
