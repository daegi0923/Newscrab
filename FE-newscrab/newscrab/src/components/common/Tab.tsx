import React, { useState } from "react";
import styled from "styled-components";

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
  options: Array<{ id: number; label: string }>; // 필터링 탭 옵션
  onFilterClick: (industryId: number) => void; // 필터링 클릭 핸들러
}

const Tab: React.FC<TabProps> = ({ options, onFilterClick }) => {
  const [selectedTabId, setSelectedTabId] = useState<number | null>(null); // 선택된 탭 ID

  const handleTabSelect = (tabId: number) => {
    setSelectedTabId(tabId);
    onFilterClick(tabId); // 탭 선택 시 필터링 핸들러 호출
  };

  return (
    <FilterContainer>
      {options.map((tab) => (
        <FilterButton
          key={tab.id}
          selected={selectedTabId === tab.id} // 현재 선택된 탭인지 확인
          onClick={() => handleTabSelect(tab.id)} // 탭 선택 핸들러 호출
        >
          {tab.label}
        </FilterButton>
      ))}
    </FilterContainer>
  );
};

export default Tab;
