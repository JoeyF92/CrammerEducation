/* eslint-disable-next-line no-unused-vars */
import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import DeckFilter from ".";

// describe("DeckFilter component", () => {

//     beforeEach(() => {
//         render(<DeckFilter />)
//     })

//     afterEach(() => {
//         cleanup();
//     })

//     it("", () => {
//         const
//     })
// })

//DeckFilter.test.jsx
// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
// import DeckFilter from "./DeckFilter";

describe("DeckFilter", () => {
  it("renders the input field correctly", () => {
    const { getByLabelText } = render(
      <DeckFilter textFilter="" setTextFilter={() => {}} />
    );

    // Check if the input field is rendered correctly
    const inputElement = getByLabelText(/search/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
  });

  // it("updates the text filter when the input value changes", () => {
  //   const setTextFilterMock = jest.fn();
  //   const { getByLabelText } = render(<DeckFilter textFilter="" setTextFilter={setTextFilterMock} />);

  //   // Get the input field and change its value
  //   const inputElement = getByLabelText(/search/i);
  //   fireEvent.change(inputElement, { target: { value: "example" } });

  //   // Check if the setTextFilter function is called with the correct value
  //   expect(setTextFilterMock).toHaveBeenCalledTimes(1);
  //   expect(setTextFilterMock).toHaveBeenCalledWith("example");
  // });
});
