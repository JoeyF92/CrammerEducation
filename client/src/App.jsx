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
  let token = localStorage.getItem('token');
  
  if (token) {
    token = JSON.parse(token);
    return token ? children : <Navigate to="/login" replace />;
  }
  return <Navigate to="/login" replace />;
}


const MainApp = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<ProtectedRoute><HomePage /></ProtectedRoute>} path="/" />
        <Route element={<ProtectedRoute><DecksPage /></ProtectedRoute>} path="decks" />
        <Route element={<ProtectedRoute><DeckPage /></ProtectedRoute>} path="decks/:id" />
        <Route element={<ProtectedRoute><FlashcardsPage /></ProtectedRoute>} path="cards" />
        <Route element={<ProtectedRoute><FlashcardPage /></ProtectedRoute>} path="cards/:id" />
        <Route element={<ProtectedRoute><MyFlashcardsPage /></ProtectedRoute>} path="myflashcards" />
        <Route element={<ProtectedRoute><AddDeckPage /></ProtectedRoute>} path="createdeck" />
        <Route element={<ProtectedRoute><AddFlashcardPage /></ProtectedRoute>} path="createcard/:deckId" />
        <Route element={<LogoutPage />} path="logout" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/*" element={<MainApp />} />
    </Routes>
  </Router>
);

export default App;

