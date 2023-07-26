import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateFlashcardForm from "../CreateFlashcardForm";
import img from "./brainsbulb.png";

const CreateDeckForm = () => {
  const [deckName, setDeckName] = useState("");
  const [subject, setSubject] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [newDeckId, setNewDeckId] = useState(null);
  const [deckCreated, setDeckCreated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (deckCreated && newDeckId !== null) {
      navigate(`/createcard/${newDeckId}`);
    }
  }, [deckCreated, newDeckId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("token"));
    const user_id = token.user_id;

    const tagsArray = tags.split(",").map((tag) => tag.trim());

    const deckData = {
      deck_name: deckName,
      subject,
      tags: tagsArray,
      image,
      user_id,
    };

    console.log("Deck Data:", deckData);

    fetch("http://localhost:3000/decks", {
      method: "POST",
      body: JSON.stringify(deckData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${user_id}`,
      },
    })
      .then((res) => {
        console.log("Response Status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Data:", data);
        setMessage("Deck created successfully.");
        setNewDeckId(data.id);
        console.log("New Deck ID:", data.id);
        setTimeout(() => {
          setMessage("");
          setDeckCreated(true);
        }, 500);
      })
      .catch((err) => {
        console.error("Error:", err);
        setMessage("Error creating the deck.");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });

    setDeckName("");
    setSubject("");
    setTags("");
    setImage("");
  };

  if (deckCreated) {
    return <CreateFlashcardForm deckId={newDeckId} />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          Deck Name:{" "}
          <input
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
          />
        </div>
        <div>
          Subject:{" "}
          <input value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div>
          Tags: <input value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <div>
          Image URL:{" "}
          <input value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <button type="submit">Create Deck</button>
        <p className="message">{message}</p>
      </form>
      <img src={img} alt="brains" className="brains" />
    </>
  );
};

export default CreateDeckForm;
