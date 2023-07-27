/* eslint-disable-next-line no-unused-vars */
import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import ShowFlashcardsList from ".";

describe("FlashCardsList component", () => {
  beforeEach(() => {
    render(<ShowFlashcardsList />);
  });

  // Clean up the DOM after each test
  afterEach(() => {
    cleanup();
  });

  it("Displays a heading with appropriate text", () => {
    const elem = screen.getByRole("heading");
    expect(elem).toBeInTheDocument;
    expect(elem.textContent).toBe("FlashcardsList");
  });
});
