import { useState } from "react";

import json from "./data.json";
import List from "./List";

function FileExplorer() {
  const [data, setData] = useState(json);
  const [folderName, setFolderName] = useState("");
  const [fileName, setFileName] = useState("");

  const handleAddFolder = (parentId) => {
    if (folderName) {
      const updateTree = (list) => {
        return list.map((node) => {
          if (node.id === parentId) {
            return {
              ...node,
              children: [
                ...node.children,
                {
                  id: Date.now().toString(),
                  name: folderName,
                  isFolder: true,
                  children: [],
                },
              ],
            };
          }
          // if (node.children) {
          //   return { ...node, children: updateTree(node.children) };
          // }
          return node;
        });
      };
      setData((prev) => updateTree(prev));
      setFolderName("");
    } else {
      alert("enter folder name");
    }
  };

  const handleAddFile = (parentId) => {
    if (fileName) {
      const updateTree = (list) => {
        return list.map((node) => {
          if (node.id === parentId) {
            return {
              ...node,
              children: [
                ...node.children,
                {
                  id: Date.now().toString(),
                  name: fileName,
                  isFolder: false,
                },
              ],
            };
          }
          // if (node.children) {
          //   return { ...node, children: updateTree(node.children) };
          // }
          return node;
        });
      };
      setData((prev) => updateTree(prev));
      setFileName("");
    } else {
      alert("enter file name");
    }
  };

  const handleDeleteNode = (itemId) => {
    const updateTree = (list) => {
      return list
        .filter((node) => node.id !== itemId)
        .map((node) => {
          if (node.children) {
            return {
              ...node,
              children: updateTree(node.children),
            };
          }
          return node;
        });
    };
    setData((prev) => updateTree(prev));
  };

  return (
    <div>
      <form>
        <input
          type="text"
          onChange={(e) => setFolderName(e.target.value)}
          value={folderName}
          placeholder="Add Folder"
        />
        <input
          type="text"
          onChange={(e) => setFileName(e.target.value)}
          value={fileName}
          placeholder="Add File"
        />
      </form>
      <List
        list={data}
        addFolder={handleAddFolder}
        addFile={handleAddFile}
        deleteNode={handleDeleteNode}
      />
    </div>
  );
}

export default FileExplorer;
