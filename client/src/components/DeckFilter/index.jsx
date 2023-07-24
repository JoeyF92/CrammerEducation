import React from 'react';

const DeckFilter = ({textFilter, setTextFilter}) => {

    function updateTextFilter (e) {
        setTextFilter(e.target.value);
    }

    return (
        <div className="deck-filters">
            <label>Search:<input type="text" value={textFilter} onChange={updateTextFilter} /></label>
        </div>
    )
};

export default DeckFilter;