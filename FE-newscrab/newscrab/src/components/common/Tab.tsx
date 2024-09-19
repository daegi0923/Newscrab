import React from "react";
import { NavLink } from "react-router-dom";
import { TabOption } from "./TabOptions";
import styled from "styled-components";
import crabIcon from "@assets/crab.png";

interface TabProps {
  options: TabOption[];
}

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 스타일 적용된 NavLink 컴포넌트
const StyledNavLink = styled(NavLink)`
  padding: 8px 16px;
  text-decoration: none;
  color: black;
  font-weight: bold;

  &.active {
    /* 활성화된 탭에 적용될 스타일 */
    color: #4370e3;
  }
`;

// 구분선
const Separator = styled.span`
  margin: 0 8px;
  color: #ccc;
`;

const CrabIcon = styled.img`
  width: 30px; /* 아이콘 크기 */
  height: 30px;
  margin-right: 5px; /* 아이콘과 텍스트 사이의 간격 */
`;

const Tab: React.FC<TabProps> = ({ options }) => {
  return (
    <TabContainer>
      <span>
        <CrabIcon src={crabIcon} alt="스크랩 아이콘" />
      </span>
      {options.map((option, index) => (
        <React.Fragment key={option.id}>
          <StyledNavLink
            to={option.path}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {option.label}
          </StyledNavLink>
          {index < options.length - 1 && <Separator>|</Separator>}
        </React.Fragment>
      ))}
    </TabContainer>
  );
};

export default Tab;
