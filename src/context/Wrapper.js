import { useState } from "react";
import Dashboard from "./Dashboard";
import { DashboardContext } from "./Context";

function Wrapper() {
  const [user, setUser] = useState({ isSubcribed: false, name: "jain" });
  return (
    <div>
      <DashboardContext.Provider value={user}>
        <Dashboard />
      </DashboardContext.Provider>
    </div>
  );
}

export default Wrapper;
