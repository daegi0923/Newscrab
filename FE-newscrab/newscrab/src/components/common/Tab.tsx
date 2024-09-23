import React from "react";
import { NavLink } from "react-router-dom";
import { TabOption } from "./TabOptions";
import styled from "styled-components";
import crabIcon from "@assets/crab.png";
import DropDown from "@common/DropDown";
import { industry } from "@common/Industry";

// Tab 컴포넌트의 props 정의
interface TabProps {
  options: TabOption[]; // 탭 옵션 배열
  selectedIndustry: string; // 현재 선택된 산업
  isDropdownOpen: boolean; // 드롭다운 메뉴 열림 여부
  onFilterTabClick: () => void; // 필터 탭 클릭 핸들러
  onIndustrySelect: (industryId: number) => void; // 산업 선택 핸들러
}

// 스타일드 컴포넌트 정의
const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  padding: 8px 16px;
  text-decoration: none;
  color: black;
  font-weight: bold;

  &.active {
    color: #4370e3; // 활성 상태일 때 색상
  }
`;

const Separator = styled.span`
  margin: 0 8px;
  color: #ccc;
`;

const CrabIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`;

const FilterContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// Tab 컴포넌트 정의
const Tab: React.FC<TabProps> = ({
  options,
  selectedIndustry,
  isDropdownOpen,
  onFilterTabClick,
  onIndustrySelect,
}) => {
  return (
    <TabContainer>
      {/* 크랩 아이콘 */}
      <span>
        <CrabIcon src={crabIcon} alt="크랩 아이콘" />
      </span>
      {/* 탭 옵션 매핑 */}
      {options.map((option, index) => (
        <React.Fragment key={option.id}>
          {option.id === "filterNews" ? (
            // 필터링 탭 (드롭다운 포함)
            <FilterContainer>
              <StyledNavLink
                to={option.path}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={onFilterTabClick}
              >
                {selectedIndustry}
              </StyledNavLink>
              {/* 드롭다운 메뉴 (열려있을 때만 표시) */}
              {isDropdownOpen && (
                <DropDown
                  dropdownIndustries={industry}
                  handleIndustrySelect={onIndustrySelect}
                />
              )}
            </FilterContainer>
          ) : (
            // 일반 탭
            <StyledNavLink
              to={option.path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {option.label}
            </StyledNavLink>
          )}
          {/* 구분선 (마지막 항목 제외) */}
          {index < options.length - 1 && <Separator>|</Separator>}
        </React.Fragment>
      ))}
    </TabContainer>
  );
};

export default Tab;
