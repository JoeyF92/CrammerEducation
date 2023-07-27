// // LoginForm.test.jsx
// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
// import LoginForm from "./LoginForm";

// describe("LoginForm", () => {
//   it("renders the form correctly", () => {
//     render(<LoginForm />);

//     expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
//   });

//   it("submits the form and displays a success message on successful login", async () => {
//     // Mock the fetch function
//     jest.spyOn(global, "fetch").mockResolvedValueOnce({
//       json: () => Promise.resolve({ token: "mockToken" }),
//       ok: true, // Mocked successful response
//     });

//     render(<LoginForm />);

//     // Fill the form fields
//     fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } });
//     fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });

//     // Submit the form
//     fireEvent.click(screen.getByRole("button", { name: /login/i }));

//     // Check if fetch was called with the correct data
//     await waitFor(() =>
//       expect(global.fetch).toHaveBeenCalledWith(
//         "http://localhost:3000/users/login",
//         expect.objectContaining({
//           method: "POST",
//           body: JSON.stringify({ email: "test@example.com", password: "password123" }),
//           headers: expect.objectContaining({
//             "Content-type": "application/json; charset=UTF-8",
//           }),
//         })
//       )
//     );

//     // Check if the success message is displayed
//     await waitFor(() =>
//       expect(screen.getByText(/user logged in successfully/i)).toBeInTheDocument()
//     );
//   });

//   it("displays an error message when login fails", async () => {
//     // Mock the fetch function to return an error response
//     jest.spyOn(global, "fetch").mockResolvedValueOnce({
//       ok: false, // Set ok to false to simulate a failed response
//       status: 401, // Simulate an error status for unauthorized login
//     });

//     render(<LoginForm />);

//     // Fill the form fields
//     fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } });
//     fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });

//     // Submit the form
//     fireEvent.click(screen.getByRole("button", { name: /login/i }));

//     // Check if fetch was called with the correct data
//     await waitFor(() =>
//       expect(global.fetch).toHaveBeenCalledWith(
//         "http://localhost:3000/users/login",
//         expect.objectContaining({
//           method: "POST",
//           body: JSON.stringify({ email: "test@example.com", password: "password123" }),
//           headers: expect.objectContaining({
//             "Content-type": "application/json; charset=UTF-8",
//           }),
//         })
//       )
//     );

//     // Check if the error message is displayed
//     await waitFor(() =>
//       expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument()
//     );
//   });
// });














import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup, getByRole } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";

import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

import Clicker from ".";

describe("LoginForm component", () => {
  beforeEach(() => {
    render(<LoginForm />);
  });

  afterEach(() => {
    cleanup();
  });
    it("Displays a heading with appropriate text", () => {
      //getbyrole refers to the aria role- aria roles are important for accessibility. (look at mdn aria roles) - useful for testing purposes as we can look at user interactions. h1s for example have roles already defined, but some dont, such as a p tag
      const elem = screen.getByRole("heading");
      //we expect the element to be in the document
      expect(elem).toBeInTheDocument;
      //we expect the text content of the element to be "Clicker!"
      expect(elem.textContent).toBe("Clicker!");
    });
    it("Increments the display when the button is clicked", async () => {
      //p doesnt have a role, so we set it as figure on the index.jsx file
      const display = screen.getByRole("figure");
      //button has a role so we can just get that
      const button = screen.getByRole("button");
      //we check what the behavior is like before and after the click:
      expect(display.textContent).toEqual("0");
      await UserEvent.click(button);
      expect(display.textContent).toEqual("1");
    });
});
