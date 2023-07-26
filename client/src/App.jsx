import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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

const ProtectedRoute = ({children}) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="decks" element={<ProtectedRoute><DecksPage /></ProtectedRoute>} />
        <Route path="decks/:id" element={<ProtectedRoute><DeckPage /></ProtectedRoute>} />
        <Route path="cards" element={<ProtectedRoute><FlashcardsPage /></ProtectedRoute>} />
        <Route path="cards/:id" element={<ProtectedRoute><FlashcardPage /></ProtectedRoute>} />
        <Route path="myflashcards" element={<ProtectedRoute><MyFlashcardsPage /></ProtectedRoute>} />
        <Route path="createdeck" element={<ProtectedRoute><AddDeckPage /></ProtectedRoute>} />
        <Route path="createcard/:deckId" element={<ProtectedRoute><AddFlashcardPage /></ProtectedRoute>} />
        <Route path="login" element={<LoginPage />} />
        <Route path="logout" element={<LogoutPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
