import React from "react";

const DeckFilter = ({ textFilter, setTextFilter }) => {
  function updateTextFilter(e) {
    setTextFilter(e.target.value);
  }

  return (
    <div className="deck-filters">
      <label>
        <input
          type="text"
          value={textFilter}
          onChange={updateTextFilter}
          placeholder="Search"
        />
      </label>
    </div>
  );
};

export default DeckFilter;
