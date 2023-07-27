/* eslint-disable-next-line no-unused-vars */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./LoginForm";

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: "sampleToken" }),
  })
);

describe("LoginForm", () => {
  it("renders the form correctly", () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button", { name: "Login" });
    const registerLink = screen.getByText("Register");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });

  it("handles form submission successfully", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button", { name: "Login" });

    const email = "test@example.com";
    const password = "testpassword";

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const message = screen.getByText("User logged in successfully.");
      expect(message).toBeInTheDocument();
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/users/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  });

  it("handles form submission with missing fields", async () => {
    render(<LoginForm />);
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const message = screen.getByText("Please fill in all fields.");
      expect(message).toBeInTheDocument();
    });
  });

  it("handles form submission with invalid email or password", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
      })
    );

    render(<LoginForm />);

    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button", { name: "Login" });

    const email = "test@example.com";
    const password = "testpassword";

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const message = screen.getByText("Invalid email or password.");
      expect(message).toBeInTheDocument();
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/users/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  });

  // TODO: Write additional tests to handle other parts of the component.
});
