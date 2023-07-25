const db = require("../connect");
const app = require("../../app");
const { Pool } = require("pg");

const User = require("../../models/User");

describe("api server", () => {
  let api;
  let userId;

  beforeAll(() => {
    api = app.listen(5000, () => {
      console.log("Test server running on port 5000");
    });
  });

  afterAll(async () => {
    console.log("Stopping test server");
    await new Promise((resolve) => api.close(resolve));
    await db.end();
  });

  // Write all tests in here:

  // Login functionality:
  describe("Login functionality", () => {
    // Create a user for testing
    const newUser = {
      first_name: "firstname",
      last_name: "lastname",
      email: "example@email.com",
      password: "testpassword",
    };

    beforeEach(async () => {
      try {
        const response = await User.create(newUser);
        userId = response.id;
        userEmail = response.email;
      } catch (error) {
        console.error("Error creating test user:", error);
      }
    });
    afterEach(async () => {
      try {
        // Clean up the user after each test
        const query = "DELETE FROM users WHERE user_id = $1";
        await db.query(query, [userId]);
      } catch (error) {
        console.error("Error cleaning up test user:", error);
      }
    });

    it("should retrieve a user by ID", async () => {
      const user = await User.getOneById(userId);
      expect(user).toBeDefined();
      expect(user.id).toBe(userId);
    });

    it("should throw an error if user is not found", async () => {
      await expect(User.getOneById(999)).rejects.toThrowError(
        "Unable to locate user."
      );
    });

    it("should get one by email", async () => {
      const user = await User.getOneByEmail(userEmail);
      expect(user).toBeDefined();
      expect(user.email).toBe(userEmail);
    });

    it("should return undefined for non-existent email", async () => {
      await expect(
        User.getOneByEmail("nonexistent@example.com")
      ).rejects.toThrowError("Unable to locate user.");
    });

    it("Should be able to update the users information", async () => {
      const updateData = [
        "Joe",
        "Tester",
        "newemail@example.com",
        "newpassword",
        userId,
      ];

      const updatedUser = await User.update(updateData);
      expect(updatedUser.first_name).toBe("Joe");
      expect(updatedUser.last_name).toBe("Tester");
      expect(updatedUser.email).toBe("newemail@example.com");
      expect(updatedUser.password).toBe("newpassword");
      expect(updatedUser.id).toBe(userId);
    });
  });
});

// To work on:
//update
//get liked
