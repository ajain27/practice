import { useState } from "react";
import "./style.css";

function List({ list, addFolder, deleteNode, addFile }) {
  const [isExpanded, setIsExpanded] = useState({});
  return (
    <div className="container">
      {list?.map((node) => (
        <div key={node.id}>
          {/* // check if the node is a folder then display the expand collapse icon */}
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
          {/* After the icon is displayed, we display the name of the folder  */}
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
