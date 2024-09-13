import React from "react";
import { Link } from "react-router-dom";
import { TabOption } from "./TabOptions";
import styled from "styled-components";

interface TabProps {
  options: TabOption[];
}

const TabContainer = styled.div`
  // display: flex;
  // justify-content: center;
  // align-items: center;
`;

// 탭 요소
const TabLink = styled(Link)`
  padding: 8px 0px;
  text-decoration: none;
  color: black;
  font-weight: bold;
`;

// 구분선
const Separator = styled.span`
  margin : 0 5px;
  color: #ccc;
`;

const Tab: React.FC<TabProps> = ({ options }) => {
  return (
    <TabContainer>
      {options.map((option, index) => (
        <React.Fragment key={option.id}>
          <TabLink to={option.path}>{option.label}</TabLink>
          {index < options.length - 1 && <Separator>|</Separator>}
        </React.Fragment>
      ))}
    </TabContainer>
  );
};

export default Tab;
