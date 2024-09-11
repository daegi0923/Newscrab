import React from "react";
import { Link } from "react-router-dom";
import { TabOption } from "./TabOptions";

interface TabProps {
  options: TabOption[];
}

const Tab: React.FC<TabProps> = ({ options }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {options.map((option, index) => (
        <React.Fragment key={option.id}>
          <Link
            to={option.path}
            style={{
              padding: "8px 16px",
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
            }}
          >
            {option.label}
          </Link>
          {index < options.length - 1 && (
            <span style={{ margin: "0 8px", color: "#ccc" }}>|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Tab;
