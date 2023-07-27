/* eslint-disable-next-line no-unused-vars */
import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";

//BrowserRouter is used for handling routing in React applications.
import { BrowserRouter } from "react-router-dom";

// this line  provides additional matchers that can be used with the Jest testing framework.
import matchers from "@testing-library/jest-dom/matchers";

//this line extends the Jest's expect function with additional matchers from "@testing-library/jest-dom". It allows you to use these custom matchers in your test assertions.
expect.extend(matchers);

import PageWrapper from ".";

describe("PageWrapper component", () => {
  // . The beforeEach function is used to render the PageWrapper component wrapped in a BrowserRouter component. This ensures that the component is rendered and ready for testing.
  beforeEach(() => {
    render(
      <BrowserRouter>
        <PageWrapper />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("Displays a nav bar with six children", () => {
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
    expect(nav.childNodes.length).toBe(6);
  });

  it("Navigates to the correct route when NavLink is clicked", () => {
    const navLinks = screen.getAllByRole("link");
    UserEvent.click(navLinks[0]);
    expect(window.location.pathname).toBe("/");

    // UserEvent.click(navLinks[1]);
    // expect(window.location.pathname).toBe("/myflashcards");

    // UserEvent.click(navLinks[2]);
    // expect(window.location.pathname).toBe("/createdeck");

    // UserEvent.click(navLinks[3]);
    // expect(window.location.pathname).toBe("/decks");

    // UserEvent.click(navLinks[4]);
    // expect(window.location.pathname).toBe("/logout");
  });
});
