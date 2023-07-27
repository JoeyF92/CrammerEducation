import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup, getByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import CreateDeckForm from ".";

describe("CreateDeckForm component", () => {
  beforeEach(() => {
    render(<CreateDeckForm />);
  });

  afterEach(() => {
    cleanup();
  });

  it("Displays a deck with appropriate text", () => {
    const elem = screen.getByRole("heading");
    expect(elem).toBeInTheDocument();
    expect(elem.textContent).toBe("CreateDeckForm!");
  });
});

// CreateDeckForm.test.jsx
// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { describe, it, expect, beforeEach, afterEach } from 'vitest';
// import "@testing-library/jest-dom/extend-expect";
// import { MemoryRouter } from "react-router-dom";
// import CreateDeckForm from "./CreateDeckForm";

// // Mock the useNavigate hook
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: jest.fn(),
// }));

// describe("CreateDeckForm", () => {
//   it("renders the form correctly", () => {
//     render(<CreateDeckForm />, { wrapper: MemoryRouter });

//     expect(screen.getByLabelText(/deck name/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /create deck/i })).toBeInTheDocument();
//   });

//   it("submits the form and navigates to the CreateFlashcardForm on successful deck creation", async () => {
//     // Mock the fetch function
//     jest.spyOn(global, "fetch").mockResolvedValueOnce({
//       json: () =>
//         Promise.resolve({
//           id: 12345, // Mocked newDeckId
//         }),
//       status: 200, // Mocked status for successful response
//     });

//     // Mock the useNavigate hook to check if it's called correctly
//     const mockNavigate = jest.fn();
//     require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

//     render(<CreateDeckForm />, { wrapper: MemoryRouter });

//     // Fill the form fields
//     fireEvent.change(screen.getByLabelText(/deck name/i), { target: { value: "My Deck" } });
//     fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: "Math" } });
//     fireEvent.change(screen.getByLabelText(/tags/i), { target: { value: "tag1, tag2, tag3" } });
//     fireEvent.change(screen.getByLabelText(/image url/i), { target: { value: "example.com/image.png" } });

//     // Submit the form
//     fireEvent.click(screen.getByRole("button", { name: /create deck/i }));

//     // Check if fetch was called with the correct data
//     await waitFor(() =>
//       expect(global.fetch).toHaveBeenCalledWith(
//         "http://localhost:3000/decks",
//         expect.objectContaining({
//           method: "POST",
//           body: JSON.stringify({
//             deck_name: "My Deck",
//             subject: "Math",
//             tags: ["tag1", "tag2", "tag3"],
//             image: "example.com/image.png",
//             user_id: null, // User_id will be set based on your token mock
//           }),
//           headers: expect.objectContaining({
//             "Content-type": "application/json; charset=UTF-8",
//             Authorization: expect.stringContaining("Bearer"), // Bearer token will be set based on your token mock
//           }),
//         })
//       )
//     );

//     // Check if the navigation function was called with the correct path
//     await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/createcard/12345"));
//   });
// });

//can be reused
// import React from 'react';
// import { describe, it, expect, beforeEach } from 'vitest';
// import { screen, render } from '@testing-library/react'

// import matchers from '@testing-library/jest-dom/matchers';
// expect.extend(matchers);

// import CreateDeckForm from '.';
