const db = require("../database/connect");
const Deck = require("./Decks");

class User {
  constructor({ user_id, first_name, last_name, email, password, liked }) {
    this.id = user_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.liked = liked;
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async getLiked(id) {
    const response = await db.query(
      "SELECT decks.* FROM decks JOIN users ON decks.deck_id = ANY(users.liked) WHERE users.user_id = $1;",
      [id]
    );
    return response.rows.map((deckData) => new Deck(deckData));
  }

  static async getOneByEmail(email) {
    const response = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async create(data) {
    const { first_name, last_name, email, password } = data;

    let response = await db.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id;",
      [first_name, last_name, email, password]
    );

    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }
  async destroy() {
    const response = await db.query("DELETE FROM users WHERE user_id = $1", [
      this.id,
    ]);
    if (response.rowCount !== 1) {
      throw new Error("Unable to locate user.");
    }
    return "User deleted successfully.";
  }

  async update(data) {
    const { first_name, last_name, email, password } = data;

    const response = await db.query(
      "UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE user_id = $5 RETURNING *;",
      [first_name, last_name, email, password, this.id]
    );

    if (response.rows.length !== 1) {
      throw new Error("Unable to update user.");
    }

    this.first_name = response.rows[0].first_name;
    this.last_name = response.rows[0].last_name;
    this.email = response.rows[0].email;
    this.password = response.rows[0].password;

    return this;
  }

  static async updateUserLiked(id, deckIdToAddOrRemove, add = true) {
    try {
      const user = await User.getOneById(id);
  
      // Check if user.liked is null and initialize it as an empty array if needed
      user.liked = user.liked || [];
  
      if (add) {
        // Append deckIdToAddOrRemove to liked array if it's not already there
        if (!user.liked.includes(deckIdToAddOrRemove)) {
          user.liked.push(deckIdToAddOrRemove);
        }
      } else {
        // Remove from liked array if it's present
        user.liked = user.liked.filter((id) => id !== deckIdToAddOrRemove);
      }
  
      const response = await db.query(
        "UPDATE users SET liked = $1 WHERE user_id = $2 RETURNING *;",
        [user.liked, id]
      );
  
      if (response.rows.length !== 1) {
        throw new Error("Unable to update liked decks for the user.");
      }
  
      return new User(response.rows[0]);
    } catch (error) {
      throw new Error("Unable to update liked decks for the user");
    }
  }
  
}

module.exports = User;
