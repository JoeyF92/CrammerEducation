# BrainBoost

## About our App

Welcome to BrainBoost, a flashcard revision app designed exclusively for Crammer Education!

As the Crammer Education customer base continues to expand rapidly and remote learning becomes increasingly popular, we recognized the need for an effective and enjoyable app to facilitate student revision and knowledge sharing. Hence, BrainBoost was born, with the primary goal of providing students with a valuable tool for seamless revision and knowledge exchange.

At BrainBoost, we offer a comprehensive database of flashcards created by the community, covering a wide range of subjects. You can easily search and access these flashcards to enhance your learning experience. Additionally, our "Trending Decks" feature allows you to explore the most popular and sought-after decks in real-time, ensuring you stay on top of the latest trends in the educational world.

The app also empowers you to actively contribute to the learning community by creating your own flashcard decks. Once created, you can easily share them with other users, fostering a collaborative and supportive learning environment.

Enhance your learning journey with BrainBoost, the ultimate destination for effective and engaging flashcard revision. Get ready to unlock your full academic potential and take your knowledge to new heights!

Join BrainBoost now,  **Fuel Your Mind, One Card at a Time!**

## Installation & Usage

#### Github steps
- Fork the repo (top right of the page).
- Go to your forked repo, it will now say `<your-github-username>CrammerEducation`.
- Click the green "code" button and copy the **SSH** option if you have already setup git in your terminal, or the **HTTPS** option if not.

#### Terminal commands (GITBASH FOR WINDOW USERS OR TERMINAL FOR MAC USERS)

- Go to the directory you want to clone in.
- Run `git clone <SSH key or HTTPS key>`.
- Then, `cd CrammerEducation`.
- Check branch is main using `git branch` otherwise `git checkout main`.
- Run `ls` to check files & folders which should have an "api" folder, "client" folder and "README.md" file.
- To open in VS code, `code .`.

#### How to install the libraries

- Change directory into the api by running `cd api`
- Install the dependancies by running `npm install`
- Now do the same in the client folder

#### How to connect the database

- Create a `.env` file within the api folder
- Login to [elephantsql](https://www.elephantsql.com)
- Create a new instance, you can name it "brainboost-db"
- In the details tab of your new db, copy the db URL
- Within your `.env` file, add `DB_URL={your copied URL}`
- Make sure the `.env` is in the `.gitignore` file!
- cd into the api folder if you aren't already, and run `npm run setup-db`
- You should see "Set-up complete." in your terminal

#### How to run the server

- To the `.env` file, add `PORT=3000`
- cd into the api folder if you aren't already, and run `npm run dev`
- You should see "API listening on 3000" in your terminal

**Make sure to leave the server running in the terminal for the next stages too.**

#### How to run the front-end

- In a separate terminal, cd into the client folder and run `npm run dev`
- Copy the link provided in the terminal and view the website in your browser

#### How to use
- Create an account on the register page and login with it on the login page.
- You will be redirected to the homepage, where you can navigate to various pages.
- You can browse flashcards, view your flashcards (flashcards you've created or liked), or create flashcards.
- You will also be able to see trending flashcards at the bottom of the homepage (those with the most likes).

#### If you wish to make a change

- Go to your terminal
- Run `git status` and check files are red.
- Run `git add .` to add **all** files
  OR `git add <folder-name>` to add a specific folder
  OR `git add <folder-name/file-name>` to add a specific file
- Run `git status` again and check files are green.
- Then, commit by `git commit -m "<message>"`.
- Finally, run `git push`.
- Make a "Pull Request" to merge it to the original repository and request a review.

## Technology used

- HTML
- CSS
- Javascript
- React + Vite
- Express.js
- Figma
- Bcrypt encryption
- Jest testing

## License

ISC license

## Wins and challenges

Fully implementing the `like` feature was challenging, as it required updating 2 tables in the database: 

- users table- the user's list of 'liked decks' needed to be updated to reflect both liking and unliking of a deck, by appending or removing the deck id from the array.
- decks table- the individual deck's number of likes had to be updated (either incremented or decremented) depending on if the user had already liked the deck or not.

To overcome this challenge, a combination of patch api requests and useState hooks were used, to ensure that the liked status was tracked for the specific user and the data was updated correctly.

## Bugs

There are no known bugs. However, some features have not yet been implemented e.g. updating flashcards in a deck

## Future features

In the future we would add an `edit` feature which would allow a user to update a flashcard deck with new flashcards or to delete flashcards from the deck. We would also implement a `teacher` feature so that teachers could create an account and assign flashcards as homework to their students.