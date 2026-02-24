import { useEffect, useState } from "react";
import "./style.css";
import json from "./DATA.json";

const allValues = json.flatMap((item) => Object.values(item));

export default function Game() {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [correctSelections, setCorrectSelections] = useState([]);
  const [matched, setMatched] = useState(new Set());

  useEffect(() => {
    setOptions(allValues);
  }, [options]);

  function isCorrectMatch(option1, option2) {
    return json.some(
      (item) =>
        (item.country === option1 && item.capital === option2) ||
        (item.country === option2 && item.capital === option1),
    );
  }

  const handleSelection = (option) => {
    const newSelection = selectedOptions.concat(option);
    if (newSelection.length === 2) {
      const [first, second] = newSelection;
      if (isCorrectMatch(first, second)) {
        setCorrectSelections(newSelection);
        setTimeout(() => {
          setMatched(new Set([...matched, ...newSelection]));
        }, 1000);
      } else {
        setSelectedOptions(newSelection);
        setTimeout(function reset() {
          setSelectedOptions([]);
        }, 1000);
      }
    } else {
      setSelectedOptions(newSelection);
    }
  };

  if (matched.size === options.length) {
    return (
      <div className="game">
        <h1>Congrats</h1>
      </div>
    );
  }

  return (
    <div className="game">
      {options.map((option) => {
        if (matched.has(option)) return null;
        const isSelected =
          selectedOptions.includes(option) ||
          correctSelections.includes(option);
        const isCorrect = correctSelections.includes(option);
        const isInCorrect =
          selectedOptions.length === 2 && isSelected && !isCorrect;
        let buttonClass = "option";

        if (isInCorrect) {
          buttonClass = "isInCorrect";
        } else if (isCorrect) {
          buttonClass = "isCorrect";
        } else if (isSelected) {
          buttonClass = "selected";
        }

        return (
          <button
            className={buttonClass}
            onClick={() => handleSelection(option)}
            key={option}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
