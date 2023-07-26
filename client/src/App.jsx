import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddDeckPage from "./pages/AddDeckPage";
import DeckPage from "./pages/DeckPage";
import DecksPage from "./pages/DecksPage";
import FlashcardPage from "./pages/FlashcardPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import MyFlashcardsPage from "./pages/MyFlashcardsPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import AddFlashcardPage from "./pages/AddFlashcardPage";
import { Header } from "./components";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/decks" element={<DecksPage />} />
        <Route path="/decks/:id" element={<DeckPage />} />
        <Route path="/cards" element={<FlashcardsPage />} />
        <Route path="/cards/:id" element={<FlashcardPage />} />
        <Route path="/myflashcards" element={<MyFlashcardsPage />} />
        <Route path="/createdeck" element={<AddDeckPage />} />
        <Route path="/createcard/:deckId" element={<AddFlashcardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
