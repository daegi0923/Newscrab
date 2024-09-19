import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TabOption } from "./TabOptions";
import styled from "styled-components";
import crabIcon from "@assets/crab.png";
import DropDown from "@common/DropDown"; // DropDown 컴포넌트 import
import { industry } from "@common/Industry "; // 카테고리 데이터 import

interface TabProps {
  options: TabOption[];
}

// 탭 메뉴를 감싸는 컨테이너 스타일 정의
const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 네비게이션 링크 스타일 정의 (활성 상태일 때 색상을 다르게 표시)
const StyledNavLink = styled(NavLink)`
  padding: 8px 16px;
  text-decoration: none;
  color: black;
  font-weight: bold;

  &.active {
    color: #4370e3; // 활성 상태일 때 색상
  }
`;

// 탭 간 구분자를 위한 스타일 (탭 사이에 세퍼레이터 표시)
const Separator = styled.span`
  margin: 0 8px;
  color: #ccc;
`;

// 아이콘 (예: 스크랩 아이콘) 스타일 정의
const CrabIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`;

// 탭 컴포넌트 정의
const Tab: React.FC<TabProps> = ({ options }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림 상태 관리
  const [selectedCategory, setSelectedCategory] = useState("필터링"); // 선택된 카테고리 상태

  // 드롭다운을 토글하는 함수
  const handleFilterClick = () => {
    setIsDropdownOpen((prev) => !prev); // 현재 상태의 반대 값으로 드롭다운 열고 닫기
  };

  // 카테고리 선택 함수
  const handleCategorySelect = (industryId: number) => {
    const categoryName =
      industry.find((ind) => ind.industryId === industryId)?.industryName ||
      "필터링";
    setSelectedCategory(categoryName); // 선택된 카테고리 이름을 상태로 설정
    setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
  };

  return (
    <TabContainer>
      <span>
        <CrabIcon src={crabIcon} alt="스크랩 아이콘" />
      </span>
      {options.map((option, index) => (
        <React.Fragment key={option.id}>
          {option.id === "filterNews" ? ( // 필터링 탭일 경우
            <>
              {/* 선택된 카테고리 이름으로 탭 텍스트 변경 */}
              <StyledNavLink
                to={option.path}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={handleFilterClick} // 필터 탭 클릭 시 드롭다운 열고 닫기
              >
                {selectedCategory} {/* 선택된 카테고리 이름 표시 */}
              </StyledNavLink>
              {isDropdownOpen && ( // 드롭다운이 열려 있는 상태일 때만 표시
                <DropDown
                  words={industry} // 카테고리 목록을 드롭다운에 전달
                  handleIndustrySelect={handleCategorySelect} // 선택 시 카테고리 이름 변경
                />
              )}
            </>
          ) : (
            // 일반적인 탭의 경우 스타일을 적용하여 네비게이션 링크로 처리
            <StyledNavLink
              to={option.path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {option.label}
            </StyledNavLink>
          )}
          {index < options.length - 1 && <Separator>|</Separator>}{" "}
          {/* 탭 간 구분자 */}
        </React.Fragment>
      ))}
    </TabContainer>
  );
};

export default Tab;
