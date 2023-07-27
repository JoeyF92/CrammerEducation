/* eslint-disable-next-line no-unused-vars */
import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import DeckCard from ".";
expect.extend(matchers);
import { BrowserRouter } from "react-router-dom";

const MockFontAwesomeIcon = () => <span>Mocked FontAwesomeIcon</span>;

describe("DeckCard component", () => {
  beforeEach(() => {
    // Mock props for the DeckCard component
    const props = {
      id: "1",
      name: "Test Deck",
      subject: "Test Subject",
      tags: ["Tag1", "Tag2"],
      likes: 10,
      image: "test-image-url",
    };
    //set some mock token data
    const tokenData = { user_id: 1 };
    localStorage.setItem("token", JSON.stringify(tokenData));

    render(
      //make sure to wrap component in browser router
      <BrowserRouter>
        <DeckCard {...props} />
      </BrowserRouter>,
      // Provide the mocked FontAwesomeIcon component as a custom render option
      { customElementMocks: { FontAwesomeIcon: MockFontAwesomeIcon } }
    );
  });

  // Clean up the DOM after each test
  afterEach(() => {
    cleanup();
  });

  it("Displays deck name, subject, and tags", () => {
    const deckNameElement = screen.getByText("Test Deck");
    const subjectElement = screen.getByText("Test Subject");
    const tagsElement = screen.getByText("# Tag1, Tag2");

    expect(deckNameElement).toBeInTheDocument();
    expect(subjectElement).toBeInTheDocument();
    expect(tagsElement).toBeInTheDocument();
  });

  it("Renders the background image if provided", () => {
    const backgroundImageElement = screen.getByTestId("deck-card-background");

    expect(backgroundImageElement).toBeInTheDocument();
    expect(backgroundImageElement).toHaveStyle({
      backgroundImage: "url(test-image-url)",
    });
  });

  it("Displays the like button with the correct like count", () => {
    const likeButtonElement = screen.getByTestId("like-button");

    expect(likeButtonElement).toBeInTheDocument();
    expect(likeButtonElement).toHaveTextContent("10"); // Assuming likes prop is 10
  });
});
