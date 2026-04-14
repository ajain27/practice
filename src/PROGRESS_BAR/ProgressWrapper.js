import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

function ProgressWrapper() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setValue((v) => v + 1);
    }, 100);
  }, []);

  return (
    <div>
      <ProgressBar value={value} />
    </div>
  );
}

export default ProgressWrapper;
