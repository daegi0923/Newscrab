import React, { useState } from "react";
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
  const [selectedTabIds, setSelectedTabIds] = useState<number[]>([]); // 하단 필터 상태

  // 필터 버튼 선택 시 상태 업데이트
  const handleTabSelect = (tabId: number) => {
    setSelectedTabIds((prevSelected) => {
      const isSelected = prevSelected.includes(tabId);
      const updatedSelectedIds = isSelected
        ? prevSelected.filter((id) => id !== tabId)
        : [...prevSelected, tabId];

      const selectedId = updatedSelectedIds.length > 0 ? tabId : null;
      onIndustrySelect(selectedId);

      return updatedSelectedIds;
    });
  };

  return (
    <>
      {/* 필터 버튼 */}
      <FilterContainer>
        {tabOptions.map((tab) => (
          <FilterButton
            key={tab.id}
            selected={selectedTabIds.includes(tab.id)}
            onClick={() => handleTabSelect(tab.id)}
          >
            {tab.label}
          </FilterButton>
        ))}
      </FilterContainer>
    </>
  );
};

export default Tab;
