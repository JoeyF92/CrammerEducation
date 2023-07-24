DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS decks;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password CHAR(60) UNIQUE NOT NULL,
    liked INT[] NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE decks (
    deck_id INT GENERATED ALWAYS AS IDENTITY,
    deck_name VARCHAR(30) UNIQUE NOT NULL,
    subject VARCHAR(30),
    tags TEXT[] NULL,
    likes INT DEFAULT 0,
    image VARCHAR(200) NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (deck_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)

);

CREATE TABLE cards (
    card_id INT GENERATED ALWAYS AS IDENTITY,
    deck_id INT,
    question VARCHAR(200) NOT NULL,
    answer VARCHAR(500) NOT NULL,
    image VARCHAR(200) NULL,
    PRIMARY KEY (card_id),
    FOREIGN KEY (deck_id) REFERENCES decks(deck_id)
);


INSERT INTO users (first_name, last_name, email, password, liked)
VALUES ('John', 'Doe', 'john.doe@example.com', 'password123', '{1,2}'),
       ('Jane', 'Smith', 'jane.smith@example.com', 'myp@ssword', '{2}');


INSERT INTO decks (deck_name, subject, tags, likes, image, user_id)
VALUES ('Math Basics', 'Mathematics', '{"math", "basics", "numbers"}', 10, 'math_basics.jpg', 1),
       ('Spanish Vocabulary', 'Language', '{"spanish", "vocabulary", "language"}', 5, 'spanish_vocab.jpg', 2);


INSERT INTO cards (deck_id, question, answer, image)
VALUES (1, 'What is 2 + 2?', '2 + 2 = 4', NULL),
       (1, 'What is 5 x 8?', '5 x 8 = 40', NULL),
       (2, '¿Cómo se dice "hello" en español?', '"Hello" se dice "hola" en español.', NULL),
       (2, '¿Cómo se dice "goodbye" en español?', '"Goodbye" se dice "adiós" en español.', NULL);
