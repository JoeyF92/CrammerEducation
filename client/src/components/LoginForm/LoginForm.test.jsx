// import { describe, it, expect, beforeEach, afterEach } from "vitest";
// import { screen, render, cleanup } from "@testing-library/react";
// import UserEvent from "@testing-library/user-event";

// import matchers from "@testing-library/jest-dom/matchers";

// expect.extend(matchers);

// import Clicker from ".";

// describe("LoginForm component", () => {
//   beforeEach(() => {
//     render(<LoginForm />);
//   });

//   afterEach(() => {
//     cleanup();
//   });
//   //   it("Displays a heading with appropriate text", () => {
//   //     //getbyrole refers to the aria role- aria roles are important for accessibility. (look at mdn aria roles) - useful for testing purposes as we can look at user interactions. h1s for example have roles already defined, but some dont, such as a p tag
//   //     const elem = screen.getByRole("heading");
//   //     //we expect the element to be in the document
//   //     expect(elem).toBeInTheDocument;
//   //     //we expect the text content of the element to be "Clicker!"
//   //     expect(elem.textContent).toBe("Clicker!");
//   //   });
//   //   it("Increments the display when the button is clicked", async () => {
//   //     //p doesnt have a role, so we set it as figure on the index.jsx file
//   //     const display = screen.getByRole("figure");
//   //     //button has a role so we can just get that
//   //     const button = screen.getByRole("button");
//   //     //we check what the behavior is like before and after the click:
//   //     expect(display.textContent).toEqual("0");
//   //     await UserEvent.click(button);
//   //     expect(display.textContent).toEqual("1");
//   //   });
// });
