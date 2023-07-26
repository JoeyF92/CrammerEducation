import React from "react";
import { CreateDeckForm } from "../../components";
import "./styles.css";

const AddDeckPage = () => {
  return (
    <div>
      <h1 id="add">Add New Deck</h1>
      <CreateDeckForm />
    </div>
  );
};

export default AddDeckPage;
