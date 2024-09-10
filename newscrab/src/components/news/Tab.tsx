import React from "react";
import { Link } from "react-router-dom";
import { TabOption } from "./tabOptions";

interface TabProps {
  options: TabOption[];
}

const Tab: React.FC<TabProps> = ({ options }) => {
  return (
    <div>
      {options.map((option) => (
        <Link key={option.id} to={option.path}>
          {option.label}
        </Link>
      ))}
    </div>
  );
};

export default Tab;
