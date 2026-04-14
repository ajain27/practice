import { useEffect, useState } from "react";
import "./ProgressBar.css";

function ProgressBar({ value = 0 }) {
  const [percentage, setpercentage] = useState(value);

  useEffect(() => {
    setpercentage(Math.min(100, Math.max(value, 0)));
  }, [value]);

  return (
    <div className="progress">
      <span>{percentage.toFixed()}%</span>
      <div style={{ width: `${percentage}%` }} />
    </div>
  );
}

export default ProgressBar;
