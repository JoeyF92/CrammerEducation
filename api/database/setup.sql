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
    image VARCHAR(350) NULL,
     PRIMARY KEY (deck_id)

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


INSERT INTO decks (deck_name, subject, tags, likes, image)
VALUES 
       ('Math Basics', 'Mathematics', '{"math", "basics", "numbers"}', 0, 'https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg'),
       ('Spanish Vocabulary', 'Language', '{"spanish", "vocabulary", "language"}', 0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVtTUByPt-BqJTdfjvplhPSNfaLDIQnD6FCw&usqp=CAU'),
       ('Biology Basics', 'Biology', '{"biology", "basics", "science"}', 0, 'https://png.pngtree.com/png-clipart/20210808/original/pngtree-handlettering-english-local-biology-png-image_6608914.jpg'),
       ('Geography Basics', 'Geography', '{"geography", "basics", "earth"}', 0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tFsL0hJZ0GvwiD62P0dT7dm8wrrZNKnQEQ&usqp=CAU');


INSERT INTO cards (deck_id, question, answer, image)
VALUES  
  (1, 'What is 25 + 13?', '25 + 13 = 38', 'https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg'),
  (1, 'What is the square root of 81?', 'The square root of 81 is 9', 'https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg'),
  (1, 'Simplify the expression: 3x + 2x', 'Simplify: 5x', 'https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg'),
  (1, 'What is the value of π (pi) to two decimal places?', 'The value of π is approximately 3.14', 'https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg'),
  (1, 'If a triangle has angles of 30°, 60°, and 90°, what type of triangle is it?', 'It is a right-angled triangle', 'https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg'),
  (1, 'What is the area of a rectangle with length 6 units and width 4 units?', 'The area is 24 square units', 'https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg'),
  (1, 'Evaluate: 2^4', '2^4 = 16', 'https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg'),
  (1, 'Find the value of x: 2x + 5 = 15', 'x = 5', 'https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg'),
  (1, 'What is the perimeter of a square with side length 8 units?', 'The perimeter is 32 units', 'https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg'),
  (1, 'What is the volume of a cube with side length 3 units?', 'The volume is 27 cubic units', 'https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg');
INSERT INTO cards (deck_id, question, answer, image)
VALUES  
  (2, 'Translate to English: "El mundo es un pañuelo."', 'Translation: "It''s a small world."', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVtTUByPt-BqJTdfjvplhPSNfaLDIQnD6FCw&usqp=CAU'),
  (2, 'Translate to English: "La verdad siempre sale a la luz."', 'Translation: "The truth always comes to light."', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVtTUByPt-BqJTdfjvplhPSNfaLDIQnD6FCw&usqp=CAU'),
  (2, 'Translate to English: "No hay mal que por bien no venga."', 'Translation: "Every cloud has a silver lining."', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVtTUByPt-BqJTdfjvplhPSNfaLDIQnD6FCw&usqp=CAU'),
  (2, 'Translate to English: "Hola"', 'Translation: "Hello"', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVtTUByPt-BqJTdfjvplhPSNfaLDIQnD6FCw&usqp=CAU'),
  (2, 'Translate to English: "Buenos días"', 'Translation: "Good morning"', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVtTUByPt-BqJTdfjvplhPSNfaLDIQnD6FCw&usqp=CAU'),
  (2, 'Translate to English: "Adiós"', 'Translation: "Goodbye"', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVtTUByPt-BqJTdfjvplhPSNfaLDIQnD6FCw&usqp=CAU'),
  (2, 'Translate to English: "A mal tiempo, buena cara."', 'Translation: "Put on a brave face in tough times."', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVtTUByPt-BqJTdfjvplhPSNfaLDIQnD6FCw&usqp=CAU'),
  (2, 'Translate to English: "El que no arriesga, no gana."', 'Translation: "Nothing ventured, nothing gained."', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVtTUByPt-BqJTdfjvplhPSNfaLDIQnD6FCw&usqp=CAU'),
  (2, 'Translate to English: "Casa"', 'Translation: "House"', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVtTUByPt-BqJTdfjvplhPSNfaLDIQnD6FCw&usqp=CAU'),
  (2, 'Translate to English: "Agua"', 'Translation: "Water"', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVtTUByPt-BqJTdfjvplhPSNfaLDIQnD6FCw&usqp=CAU');
INSERT INTO cards (deck_id, question, answer, image)
VALUES  
  (3, 'What is the basic unit of life?', 'The basic unit of life is the cell.', 'https://png.pngtree.com/png-clipart/20210808/original/pngtree-handlettering-english-local-biology-png-image_6608914.jpg'),
  (3, 'What is photosynthesis?', 'Photosynthesis is the process by which green plants convert sunlight into energy to produce food (glucose) and release oxygen.', 'https://png.pngtree.com/png-clipart/20210808/original/pngtree-handlettering-english-local-biology-png-image_6608914.jpg'),
  (3, 'What are the main types of blood vessels?', 'The main types of blood vessels are arteries, veins, and capillaries.', 'https://png.pngtree.com/png-clipart/20210808/original/pngtree-handlettering-english-local-biology-png-image_6608914.jpg'),
  (3, 'What is the function of the respiratory system?', 'The function of the respiratory system is to facilitate the exchange of oxygen and carbon dioxide between the body and the environment.', 'https://png.pngtree.com/png-clipart/20210808/original/pngtree-handlettering-english-local-biology-png-image_6608914.jpg'),
  (3, 'What are the four main types of tissues in the human body?', 'The four main types of tissues are epithelial, connective, muscle, and nervous tissues.', 'https://png.pngtree.com/png-clipart/20210808/original/pngtree-handlettering-english-local-biology-png-image_6608914.jpg'),
  (3, 'What is DNA?', 'DNA (Deoxyribonucleic Acid) is the genetic material that carries the hereditary information in most living organisms.', 'https://png.pngtree.com/png-clipart/20210808/original/pngtree-handlettering-english-local-biology-png-image_6608914.jpg'),
  (3, 'What is mitosis?', 'Mitosis is the process of cell division that results in two identical daughter cells with the same number of chromosomes as the parent cell.', 'https://png.pngtree.com/png-clipart/20210808/original/pngtree-handlettering-english-local-biology-png-image_6608914.jpg'),
  (3, 'What is the function of the nervous system?', 'The nervous system is responsible for transmitting and processing information in the body, allowing for communication and control of various bodily functions.', 'https://png.pngtree.com/png-clipart/20210808/original/pngtree-handlettering-english-local-biology-png-image_6608914.jpg'),
  (3, 'What are the three main types of muscles in the human body?', 'The three main types of muscles are skeletal muscles, smooth muscles, and cardiac muscles.', 'https://png.pngtree.com/png-clipart/20210808/original/pngtree-handlettering-english-local-biology-png-image_6608914.jpg'),
  (3, 'What is the function of the circulatory system?', 'The circulatory system is responsible for transporting blood, nutrients, and oxygen to different parts of the body and removing waste products.', 'https://png.pngtree.com/png-clipart/20210808/original/pngtree-handlettering-english-local-biology-png-image_6608914.jpg');
INSERT INTO cards (deck_id, question, answer, image)
VALUES  
  (4, 'What is the capital of France?', 'The capital of France is Paris.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tFsL0hJZ0GvwiD62P0dT7dm8wrrZNKnQEQ&usqp=CAU'),
  (4, 'Which river is the longest in the world?', 'The Nile River is the longest river in the world.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tFsL0hJZ0GvwiD62P0dT7dm8wrrZNKnQEQ&usqp=CAU'),
  (4, 'What is the largest desert in the world?', 'The largest desert in the world is the Sahara Desert.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tFsL0hJZ0GvwiD62P0dT7dm8wrrZNKnQEQ&usqp=CAU'),
  (4, 'Which country is known as the "Land of the Rising Sun"?', 'Japan is known as the "Land of the Rising Sun".', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tFsL0hJZ0GvwiD62P0dT7dm8wrrZNKnQEQ&usqp=CAU'),
  (4, 'What is the highest mountain in the world?', 'Mount Everest is the highest mountain in the world.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tFsL0hJZ0GvwiD62P0dT7dm8wrrZNKnQEQ&usqp=CAU'),
  (4, 'Which continent is known as the "Dark Continent"?', 'Africa is known as the "Dark Continent".', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tFsL0hJZ0GvwiD62P0dT7dm8wrrZNKnQEQ&usqp=CAU'),
  (4, 'Which country is famous for its tulip fields and windmills?', 'The Netherlands is famous for its tulip fields and windmills.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tFsL0hJZ0GvwiD62P0dT7dm8wrrZNKnQEQ&usqp=CAU'),
  (4, 'Which ocean is the largest in the world?', 'The Pacific Ocean is the largest ocean in the world.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tFsL0hJZ0GvwiD62P0dT7dm8wrrZNKnQEQ&usqp=CAU'),
  (4, 'What is the world''s largest rainforest?', 'The Amazon Rainforest is the world''s largest rainforest.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tFsL0hJZ0GvwiD62P0dT7dm8wrrZNKnQEQ&usqp=CAU'),
  (4, 'Which city is located at the meeting point of the Blue Nile and White Nile rivers?', 'Khartoum is located at the meeting point of the Blue Nile and White Nile rivers.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tFsL0hJZ0GvwiD62P0dT7dm8wrrZNKnQEQ&usqp=CAU');
