const db = require("./connect.js");

const createDbEnv = async () => {
  try {
    await db.query("DROP TABLE IF EXISTS cards");
    await db.query("DROP TABLE IF EXISTS decks");
    await db.query("DROP TABLE IF EXISTS token");
    await db.query("DROP TABLE IF EXISTS users CASCADE");
  } catch (error) {
    console.error("Error dropping database tables:", error);
    throw error;
  }
  try {
    await db.query(`CREATE TABLE users (
            user_id INT GENERATED ALWAYS AS IDENTITY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password CHAR(60) UNIQUE NOT NULL,
            liked INT[] NULL,
            PRIMARY KEY (user_id)
        )`);

    await db.query(`CREATE TABLE token (
        token_id INT GENERATED ALWAYS AS IDENTITY,
        user_id INT NOT NULL,
        token CHAR(36) UNIQUE NOT NULL,
        PRIMARY KEY (token_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        )`);

    await db.query(`CREATE TABLE decks (
        deck_id INT GENERATED ALWAYS AS IDENTITY,
        deck_name VARCHAR(30) UNIQUE NOT NULL,
        subject VARCHAR(30),
        tags TEXT[] NULL,
        likes INT DEFAULT 0,
        image VARCHAR(200) NULL,
        user_id INT NOT NULL,
        PRIMARY KEY (deck_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id))`);

    await db.query(`CREATE TABLE cards (
            card_id INT GENERATED ALWAYS AS IDENTITY,
            deck_id INT,
            question VARCHAR(200) NOT NULL,
            answer VARCHAR(500) NOT NULL,
            image VARCHAR(200) NULL,
            PRIMARY KEY (card_id),
            FOREIGN KEY (deck_id) REFERENCES decks(deck_id) ON DELETE CASCADE
        )`);
  } catch (error) {
    // Handle the error
    console.error("Error creating database tables:", error);
    throw error; // Rethrow the error to the caller if necessary
  }
};

const populateDbEnv = async () => {
  try {
    await db.query(
      "INSERT INTO users  (first_name, last_name, email, password, liked) VALUES ('John', 'Doe', 'john.doe@example.com', 'password123', '{1,2}')"
    );
    await db.query(
      "INSERT INTO decks (deck_name, subject, tags, likes, image, user_id) VALUES ('Biology Flashcards', 'Biology', '{\"biology\", \"science\"}', 0, 'deck1 image', 1)"
    );
    await db.query(
      "INSERT INTO cards  (deck_id, question, answer, image) VALUES (1, 'Question 1', 'answer 1', 'image2')"
    );
  } catch (error) {
    console.error("Error populating database:", error);
    throw error;
  }
};

const destroyDbEnv = async () => {
  try {
    await db.query("DROP TABLE IF EXISTS cards");
    await db.query("DROP TABLE IF EXISTS decks");
    await db.query("DROP TABLE IF EXISTS token");
    await db.query("DROP TABLE IF EXISTS users CASCADE");
  } catch (error) {
    console.error("Error dropping database tables:", error);
    throw error;
  }
};

module.exports = { createDbEnv, populateDbEnv, destroyDbEnv };
