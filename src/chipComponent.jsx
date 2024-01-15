// ChipComponent.jsx
import React, { useState, useRef, useEffect } from 'react';
import './ChipComponent.css';

const ChipComponent = () => {
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const inputRef = useRef(null);

  const items = [
    { id: 1, label: 'Nick Giannopoulos', email: 'nick@example.com', image: 'url_to_nick_image' },
    { id: 2, label: 'Mariana Augustine', email: 'mariana@example.com', image: 'url_to_mariana_image' },
    { id: 3, label: 'Narayana Garner', email: 'narayana@example.com', image: 'url_to_narayana_image' },
    { id: 4, label: 'Alice Smith', email: 'alice@example.com', image: 'url_to_alice_image' },
    { id: 5, label: 'Anita Gros', email: 'anita@example.com', image: 'url_to_anita_image' },
    { id: 6, label: 'Megan Smith', email: 'megan@example.com', image: 'url_to_megan_image' },
    { id: 7, label: 'Matthew McConaughey', email: 'matthew@example.com', image: 'url_to_matthew_image' },
  ];

  useEffect(() => {
    const handleBackspace = (event) => {
      if (event.key === 'Backspace' && inputValue === '' && chips.length > 0) {
        removeChip(chips[chips.length - 1]);
      }
    };

    document.addEventListener('keydown', handleBackspace);

    return () => {
      document.removeEventListener('keydown', handleBackspace);
    };
  }, [inputValue, chips]);

  const filterItems = (value) => {
    const lowercasedValue = value.toLowerCase();
    const filtered = items.filter(
      (item) =>
        item.label.toLowerCase().includes(lowercasedValue) &&
        !chips.some((chip) => chip.id === item.id)
    );
    setFilteredItems(filtered);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    filterItems(value);
  };

  const handleItemClick = (item) => {
    setChips([...chips, item]);
    setInputValue('');
    setFilteredItems([]);
  };

  const removeChip = (chipToRemove) => {
    setChips((prevChips) => prevChips.filter((chip) => chip.id !== chipToRemove.id));
    setFilteredItems((prevItems) => [...prevItems, chipToRemove]);
  };

  return (
    <div className="chip-container">
      <div className="chips">
        {chips.map((chip) => (
          <div key={chip.id} className="chip">
            <img src={chip.image} alt={chip.label} className="chip-image" />
            {chip.label}
            <span className="remove-icon" onClick={() => removeChip(chip)}>
              X
            </span>
          </div>
        ))}
        {inputValue && (
          <div className="chip">
            <img
              src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser_666201&psig=AOvVaw0-gdqC4mMl9PXfa-w_wT19&ust=1705433975385000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCMjkq9uS4IMDFQAAAAAdAAAAABAE"
              alt="Default"
              className="chip-image"
            />
            {inputValue}
            <span className="remove-icon" onClick={() => setInputValue('')}>
              X
            </span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="chip-input"
        placeholder="Type to search..."
      />
      {filteredItems.length > 0 && (
        <ul className="item-list">
          {filteredItems.map((item) => (
            <li key={item.id} onClick={() => handleItemClick(item)}>
              {item.label}
              <span className="email">{item.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChipComponent;
