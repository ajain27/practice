import { useState } from "react";
import json from "./Data.js";
import "./style.css";

function Email() {
  const [favorite, setFavorite] = useState(json);

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";

    return (first + last).toUpperCase();
  };
  getInitials();

  const toggleFavorite = (id) => {
    setFavorite((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, favorite: !item.favorite } // toggle boolean
          : item,
      ),
    );
  };

  return (
    <div>
      {
        <ul className="email_List">
          {favorite.map((email) => (
            <li className="email">
              <span className="data">{getInitials(email.name)}</span>
              <span className="data" onClick={() => toggleFavorite(email.id)}>
                {email.favorite ? "⭐" : "☆"}
              </span>
              <span className="data">{email.name}</span>
              <span className="data">{email.subject}</span>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}

export default Email;
