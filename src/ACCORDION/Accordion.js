import { useState } from "react";

import data from "./data.json";
import "./style.css";

function Accordion() {
  const [isExpanded, setIsExpanded] = useState(null);

  const handleToggle = (id) => {
    setIsExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="accordion">
      {data.map((item) => (
        <div
          key={item.id}
          className={
            isExpanded === item.id ? "accordion-item active" : "accordion-item"
          }
        >
          <button
            className="accordion-title"
            onClick={() => handleToggle(item.id)}
          >
            {item.title}
            <span>{isExpanded === item.id ? "-" : "+"}</span>
          </button>
          {isExpanded === item.id && (
            <div className="accordion-content"> {item.content} </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
