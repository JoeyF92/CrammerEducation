// RegisterForm.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import "@testing-library/jest-dom/extend-expect";
import RegisterForm from "./RegisterForm";

describe("RegisterForm", () => {
  it("renders the form correctly", () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  it("submits the form and displays a success message on successful registration", async () => {
    // Mock the fetch function
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve({}),
      ok: true, // Mocked successful response
    });

    render(<RegisterForm />);

    // Fill the form fields
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    // Check if fetch was called with the correct data
    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/users/register",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            first_name: "John",
            last_name: "Doe",
            email: "john.doe@example.com",
            password: "password123",
          }),
          headers: expect.objectContaining({
            "Content-type": "application/json; charset=UTF-8",
          }),
        })
      )
    );

    // Check if the success message is displayed
    await waitFor(() =>
      expect(screen.getByText(/user registered successfully/i)).toBeInTheDocument()
    );
  });

  it("displays an error message when registration fails", async () => {
    // Mock the fetch function to return an error response
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          detail: "400", // Simulate an error response
        }),
      ok: false, // Set ok to false to simulate a failed response
    });

    render(<RegisterForm />);

    // Fill the form fields
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    // Check if fetch was called with the correct data
    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/users/register",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            first_name: "John",
            last_name: "Doe",
            email: "john.doe@example.com",
            password: "password123",
          }),
          headers: expect.objectContaining({
            "Content-type": "application/json; charset=UTF-8",
          }),
        })
      )
    );

    // Check if the error message is displayed
    await waitFor(() =>
      expect(screen.getByText(/email is already in use. please use a different email./i)).toBeInTheDocument()
    );
  });
});
