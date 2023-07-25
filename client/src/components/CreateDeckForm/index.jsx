// import React, { useState } from "react";

// const CreateDeckForm = () => {
//   const [formData, setFormData] = useState({
//     deck_name: "",
//     subject: "",
//     tags: "",
//     image: "",
//   });

//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Convert the tags string to an array
//     const tagsArray = formData.tags.split(",").map((tag) => tag.trim());

//     // Update the formData to include the tags array
//     const updatedFormData = { ...formData, tags: tagsArray };

//     try {
//       const response = await fetch("http://localhost:3000/decks", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedFormData),
//       });

//       if (!response.ok) {
//         const errorMessage = await response.json();
//         throw new Error(errorMessage.error);
//       }

//       const deck = await response.json();
//       console.log("Deck created:", deck);

//       // Show the success message for 3 seconds
//       setShowSuccessMessage(true);
//       setTimeout(() => {
//         setShowSuccessMessage(false);
//       }, 3000);

//       // Clear the form inputs
//       setFormData({
//         deck_name: "",
//         subject: "",
//         tags: "",
//         image: "",
//       });

//       // You can handle the response data here as needed.
//     } catch (error) {
//       console.error("Error creating deck:", error.message);
//       // Handle the error (e.g., show an error message to the user).
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="deck_name"
//         value={formData.deck_name}
//         onChange={handleChange}
//         placeholder="Deck Name"
//       />
//       <input
//         type="text"
//         name="subject"
//         value={formData.subject}
//         onChange={handleChange}
//         placeholder="Subject"
//       />
//       <input
//         type="text"
//         name="tags"
//         value={formData.tags}
//         onChange={handleChange}
//         placeholder="Tags"
//       />
//       <input
//         type="text"
//         name="image"
//         value={formData.image}
//         onChange={handleChange}
//         placeholder="Image URL"
//       />
//       <button type="submit">Create Deck</button>

//       {showSuccessMessage && <p>New deck was successfully created!</p>}
//     </form>
//   );
// };

// export default CreateDeckForm;

import React, { useState } from "react";

const CreateDeckForm = () => {
  const [formData, setFormData] = useState({
    deck_name: "",
    subject: "",
    tags: "",
    image: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [createdDeck, setCreatedDeck] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the tags string to an array
    const tagsArray = formData.tags.split(",").map((tag) => tag.trim());

    // Update the formData to include the tags array
    const updatedFormData = { ...formData, tags: tagsArray };

    try {
      const response = await fetch("http://localhost:3000/decks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
      }

      const deck = await response.json();
      console.log("Deck created:", deck);

      // Update the state with the created deck data
      setCreatedDeck(deck);

      // Show the success message for 3 seconds
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      // Clear the form inputs
      setFormData({
        deck_name: "",
        subject: "",
        tags: "",
        image: "",
      });
    } catch (error) {
      console.error("Error creating deck:", error.message);
      // Handle the error (e.g., show an error message to the user).
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="deck_name"
          value={formData.deck_name}
          onChange={handleChange}
          placeholder="Deck Name"
        />
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
        />
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags"
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <button type="submit">Create Deck</button>
      </form>

      {showSuccessMessage && <p>New deck was successfully created!</p>}

      {/* Render the created deck */}
      {createdDeck && (
        <div>
          <h2>Created Deck:</h2>
          <p>Deck Name: {createdDeck.deck_name}</p>
          <p>Subject: {createdDeck.subject}</p>
          <p>Tags: {createdDeck.tags.join(", ")}</p>
          <p>Image URL: {createdDeck.image}</p>
        </div>
      )}
    </>
  );
};

export default CreateDeckForm;
