import  { useState} from "react";
import axios from "axios";
import "./cardSearch.css";

const CardSearch = () => {
  const [cardName, setCardName] = useState("Dark Magician");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setCardName(value);

    if (value === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(
          value
        )}`
      );

      const cardSuggestions = response.data.data.map((card) => card.name);
      setSuggestions(cardSuggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching card suggestions:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setCardName(suggestion);
    setSuggestions([]);
    setTimeout(() => {
      setShowSuggestions(false);
    }, 100); 
  };

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(
          cardName
        )}`
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  };

  return (
    <div className="card-search-container">
      <div className="search-bar">
        <p>Enter Card Name</p>
        <input
          type="text"
          value={cardName}
          onChange={handleInputChange}
          onBlur={() => {
            setTimeout(() => {
              setShowSuggestions(false);
            }, 100);
          }}
        />
        <button onClick={handleButtonClick}>Search</button>
      </div>
      <div>
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions active">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CardSearch;
