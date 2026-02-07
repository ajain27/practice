import { useState } from "react";
import "./style.css";

function List({ list, addFolder, deleteNode, addFile }) {
  const [isExpanded, setIsExpanded] = useState({});
  return (
    <div className="container">
      {list?.map((node) => (
        <div key={node.id}>
          {node.isFolder && (
            <span
              className={`icon ${!node.isFolder ? "placeholder" : ""}`}
              onClick={() =>
                setIsExpanded((prev) => ({
                  ...prev,
                  [node.name]: !prev[node.name],
                }))
              }
            >
              {!isExpanded?.[node.name] ? "+" : "-"}
            </span>
          )}
          <span className="name">{node.name}</span>
          {node.isFolder && (
            <>
              <button onClick={() => addFolder(node.id)}>✚ 📁</button>
              <button onClick={() => addFile(node.id)}>✚ 📎</button>
            </>
          )}
          <button onClick={() => deleteNode(node.id)}>❌</button>
          {isExpanded?.[node.name] && node.children && (
            <List
              list={node.children}
              addFolder={addFolder}
              addFile={addFile}
              deleteNode={deleteNode}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default List;
