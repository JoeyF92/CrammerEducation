// const db = require("../database/connect");

// class Deck {
//     constructor ({deck_id, deck_name, subject, tags, likes, image, user_id}) {
//         this.id = deck_id;
//         this.name = deck_name;
//         this.subject = subject;
//         this.tags = tags;
//         this.likes = likes;
//         this.image = image;
//         this.user_id = user_id;
//     }

//     static async getAll() {
//         const response = await db.query("SELECT * FROM decks ORDER BY likes DESC;");
//         return response.rows.map(g => new Deck(g));
//     }

//     static async getOneById(id) {
//         const response = await db.query("SELECT * FROM decks WHERE deck_id = $1;", [id]);
//         if (response.rows.length != 1) {
//             throw new Error("Unable to locate deck.")
//         }
//         return new Deck(response.rows[0]);
//     }

//     static async create(data) {
//         const{deck_name, subject, tags, image, likes=0, user_id} = data;
//         const response = await db.query('INSERT INTO decks (deck_name, subject, tags, image, likes, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [deck_name, subject, tags, image, likes, user_id]);

//         return response.rows.map(w => new Deck(w))
//     }

//     async update(data) {
//         const response = await db.query("UPDATE decks SET likes = $1 WHERE deck_id = $2 RETURNING deck_id, likes;",
//             [ this.likes + data.likes, this.id ]);
//         if (response.rows.length != 1) {
//             throw new Error("Unable to update likes.")
//         }
//         return new Deck(response.rows[0]);
//     }

//     async destroy() {
//         const response = await db.query('DELETE FROM decks WHERE deck_id = $1 RETURNING *;', [this.id]);

//         return new Deck(response.rows[0]);
//     }

// }

// module.exports = Deck;

const db = require("../database/connect");

class Deck {
  constructor({ deck_id, deck_name, subject, tags, likes, image }) {
    this.id = deck_id;
    this.name = deck_name;
    this.subject = subject;
    this.tags = tags;
    this.likes = likes;
    this.image = image;
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM decks ORDER BY likes DESC;");
    return response.rows.map((g) => new Deck(g));
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM decks WHERE deck_id = $1;", [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate deck.");
    }
    return new Deck(response.rows[0]);
  }

  static async create(data) {
    const { deck_name, subject, tags, image, likes = 0 } = data;

    if (!deck_name === "") {
      throw new Error("Deck name is required.");
    }

    const response = await db.query(
      "INSERT INTO decks (deck_name, subject, tags, image, likes) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [deck_name, subject, tags, image, likes]
    );

    return new Deck(response.rows[0]);
  }

  async update(data) {
    const response = await db.query(
      "UPDATE decks SET likes = $1 WHERE deck_id = $2 RETURNING deck_id, likes;",
      [this.likes + data.likes, this.id]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to update likes.");
    }
    return new Deck(response.rows[0]);
  }

  async destroy() {
    const response = await db.query(
      "DELETE FROM decks WHERE deck_id = $1 RETURNING *;",
      [this.id]
    );

    return new Deck(response.rows[0]);
  }
}

module.exports = Deck;
