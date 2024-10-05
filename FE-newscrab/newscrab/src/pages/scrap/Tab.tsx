import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { tabOptions } from "./TabOptions";

// 필터 버튼 스타일
const FilterButton = styled.button<{ selected: boolean }>`
  padding: 8px 16px;
  margin: 4px;
  border-radius: 20px;
  border: ${(props) =>
    props.selected ? "2px solid #4370e3" : "1px solid #ccc"};
  background-color: ${(props) => (props.selected ? "#e3f2fd" : "#fff")};
  color: ${(props) => (props.selected ? "#4370e3" : "#000")};
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

interface TabProps {
  onIndustrySelect: (industryId: number | null) => void;
}

const Tab: React.FC<TabProps> = ({ onIndustrySelect }) => {
  const [selectedTabId, setSelectedTabId] = useState<number | null>(null); // 선택된 탭의 ID 상태

  // 컴포넌트가 로드될 때, localStorage에서 필터 상태 불러오기
  useEffect(() => {
    const savedTabId = localStorage.getItem("selectedScrapIndustryId");
    if (savedTabId) {
      setSelectedTabId(parseInt(savedTabId, 10)); // localStorage에서 불러온 값을 설정
      onIndustrySelect(parseInt(savedTabId, 10)); // 부모 컴포넌트로 값 전달
    }
  }, [onIndustrySelect]);

  // 필터 버튼 선택 시 상태 업데이트 및 localStorage 저장
  const handleTabSelect = (tabId: number) => {
    const newSelectedId = selectedTabId === tabId ? null : tabId; // 이미 선택된 탭 클릭 시 선택 해제
    setSelectedTabId(newSelectedId); // 선택된 탭 업데이트
    onIndustrySelect(newSelectedId); // 부모 컴포넌트에 선택된 탭 ID 전달
    localStorage.setItem(
      "selectedScrapIndustryId",
      newSelectedId ? newSelectedId.toString() : ""
    ); // localStorage에 선택된 탭 저장
  };

  return (
    <FilterContainer>
      {tabOptions.map((tab) => (
        <FilterButton
          key={tab.id}
          selected={selectedTabId === tab.id} // 현재 선택된 탭과 비교
          onClick={() => handleTabSelect(tab.id)}
        >
          {tab.label}
        </FilterButton>
      ))}
    </FilterContainer>
  );
};

export default Tab;
