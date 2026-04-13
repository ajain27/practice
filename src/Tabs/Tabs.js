import { useState } from "react";
import "./tabs.css";

function Tabs() {
  const tabsData = [
    { id: "tab1", label: "Tab 1", content: "This is the content for Tab 1." },
    { id: "tab2", label: "Tab 2", content: "This is the content for Tab 2." },
    { id: "tab3", label: "Tab 3", content: "This is the content for Tab 3." },
  ];

  const [isActive, setisActive] = useState("tab1");

  const handleActive = (id) => {
    setisActive(id);
  };

  return (
    <div className="tabs-wrapper">
      {tabsData.map((tab) => (
        <span className="tabs" key={tab.id}>
          <button
            className={isActive === tab.id ? "active" : ""}
            onClick={() => handleActive(tab.id)}
          >
            {tab.label}
          </button>
          {isActive === tab.id && <div className="content">{tab.content}</div>}
        </span>
      ))}
    </div>
  );
}

export default Tabs;
