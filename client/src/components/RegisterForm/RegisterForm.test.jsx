import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

describe("RegisterForm", () => {
  it("renders the form correctly", () => {
    render(<RegisterForm />);
    const firstNameInput = screen.getByLabelText("First Name:");
    const lastNameInput = screen.getByLabelText("Last Name:");
    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button", { name: "Register" });

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("handles form submission successfully", async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    const firstNameInput = screen.getByLabelText("First Name:");
    const lastNameInput = screen.getByLabelText("Last Name:");
    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button", { name: "Register" });

    const firstName = "John";
    const lastName = "Doe";
    const email = "john.doe@example.com";
    const password = "testpassword";

    fireEvent.change(firstNameInput, { target: { value: firstName } });
    fireEvent.change(lastNameInput, { target: { value: lastName } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    fireEvent.click(submitButton);

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/login"));
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/users/register", {
      method: "POST",
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  });

  it("handles form submission with missing fields", async () => {
    render(<RegisterForm />);
    const submitButton = screen.getByRole("button", { name: "Register" });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const message = screen.getByText("Please fill in all fields.");
      expect(message).toBeInTheDocument();
    });
  });

  // TODO: Write additional tests to handle error cases and other parts of the component.
});
