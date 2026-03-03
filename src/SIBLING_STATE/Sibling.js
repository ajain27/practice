import { useMemo, useState } from "react";
import Search from "./Search";
import List from "./List";
import json from "./Data.js";

function Sibling() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return json.filter((d) => {
      return d.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
    });
  }, [searchTerm]);

  return (
    <div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <List items={filteredData} />
    </div>
  );
}

export default Sibling;
