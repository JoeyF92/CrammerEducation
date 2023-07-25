import React from "react";

export default function CreateFlashcardForm() {
  return (
    <div>
      <h1>New Flashcard</h1>
    </div>
  );
}

// import React, { useState } from "react";
// import axios from "axios";

// const CreateFlashcardForm = ({ deckId }) => {
//   const [formData, setFormData] = useState({
//     question: "",
//     answer: "",
//     image: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `http://localhost:3000/decks/${deckId}/cards`,
//         formData
//       );
//       // Handle success (e.g., show a success message or redirect)
//       console.log("Flashcard created:", response.data);
//     } catch (error) {
//       // Handle error (e.g., show an error message)
//       console.error("Error creating flashcard:", error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="question"
//         value={formData.question}
//         onChange={handleChange}
//         placeholder="Question"
//       />
//       <input
//         type="text"
//         name="answer"
//         value={formData.answer}
//         onChange={handleChange}
//         placeholder="Answer"
//       />
//       <input
//         type="text"
//         name="image"
//         value={formData.image}
//         onChange={handleChange}
//         placeholder="Image URL"
//       />
//       <button type="submit">Create Flashcard</button>
//     </form>
//   );
// };

// export default CreateFlashcardForm;
