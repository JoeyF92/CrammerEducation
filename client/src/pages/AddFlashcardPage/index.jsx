import React from "react";
import { useParams } from "react-router-dom";
import { CreateFlashcardForm } from "../../components";
import "./styles.css";

const AddFlashcardPage = () => {
  const { deckId } = useParams();

  return (
    <div>
      <h1 id="add">Add Flashcard Page</h1>
      <CreateFlashcardForm deckId={deckId} />
    </div>
  );
};

export default AddFlashcardPage;
