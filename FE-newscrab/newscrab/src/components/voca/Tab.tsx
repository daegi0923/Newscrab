import React from "react";
import { TabOption } from "./TabOptions";
import styled from "styled-components";

interface TabProps {
  options: TabOption[];
  onFilterChange: (id: string) => void;
  activeFilter: string;
}

const TabContainer = styled.div``;

const TabButton = styled.button<{ active: boolean; isFilterVoca: boolean }>`
  padding: 8px 8px;
  cursor: pointer;
  text-decoration: none;
  color: black;
  color: ${(props) => (props.isFilterVoca ? "blue" : "black")}; // 필터링일 때 색상 변경
  font-weight: bold;
  background: none;
  border: none;
  border-bottom: ${(props) => (props.active ? "2px solid black" : "none")}; // 활성화된 필터에 스타일 추가
  position: relative;
  `;

const Separator = styled.span`
  margin: 0 5px;
  color: #ccc;
`;

const Tab: React.FC<TabProps> = ({ options, onFilterChange, activeFilter }) => {
  return (
    <TabContainer>
      {options.map((option, index) => (
        <React.Fragment key={option.id}>
          <TabButton
            active={activeFilter === option.id}
            isFilterVoca={option.id === "filterVoca"}
            onClick={() => onFilterChange(option.id)}
          >
            {option.label}
          </TabButton>
          {index < options.length - 1 && <Separator>|</Separator>}
        </React.Fragment>
      ))}
    </TabContainer>
  );
};

export default Tab;
