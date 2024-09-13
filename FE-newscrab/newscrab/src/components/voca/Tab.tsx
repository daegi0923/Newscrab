import React from "react";
// import { Link } from "react-router-dom";
import { TabOption } from "./TabOptions";
import styled from "styled-components";

interface TabProps {
  options: TabOption[];
  onFilterChange: (id: string) => void; // 필터 변경을 처리하는 함수 추가
}

const TabContainer = styled.div`
  // display: flex;
  // justify-content: center;
  // align-items: center;
`;

// // 탭 요소
// const TabLink = styled(Link)`
//   padding: 8px 0px;
//   text-decoration: none;
//   color: black;
//   font-weight: bold;
// `;

// 탭 요소
const TabButton = styled.button`
  padding: 8px 8px;
  cursor: pointer;
  text-decoration: none;
  color: black;
  font-weight: bold;
  background: none;
  border: none;
`;

// 구분선
const Separator = styled.span`
  margin : 0 5px;
  color: #ccc;
`;

const Tab: React.FC<TabProps> = ({ options, onFilterChange }) => {
  return (
    <TabContainer>
      {options.map((option, index) => (
        <React.Fragment key={option.id}>
          <TabButton onClick={() => onFilterChange(option.id)}>
            {option.label}
          </TabButton>
          {index < options.length - 1 && <Separator>|</Separator>}
        </React.Fragment>
      ))}
    </TabContainer>
  );
};

export default Tab;
