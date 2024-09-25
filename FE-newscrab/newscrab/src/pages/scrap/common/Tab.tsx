import React, { useState } from "react";
import styled from "styled-components";
import { tabOptions } from "./TabOptions";

// 필터 버튼 스타일 정의
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

// 필터링 버튼을 감싸는 컨테이너 스타일 정의
const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

// 필터링된 데이터를 보여줄 컨테이너
const FilteredDataContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
`;

const Tab: React.FC = () => {
  const [selectedTabIds, setSelectedTabIds] = useState<number[]>([]); // 선택된 탭 ID 배열

  // 필터 선택 핸들러
  const handleTabSelect = (tabId: number) => {
    setSelectedTabIds(
      (prevSelected) =>
        prevSelected.includes(tabId)
          ? prevSelected.filter((id) => id !== tabId) // 이미 선택된 탭이면 제거
          : [...prevSelected, tabId] // 선택되지 않았으면 추가
    );
  };

  // 필터링된 데이터를 보여주는 예시 (실제 데이터로 대체 가능)
  const filteredData =
    selectedTabIds.length > 0
      ? `현재 선택된 산업은: ${selectedTabIds
          .map((id) => tabOptions.find((tab) => tab.id === id)?.label)
          .join(", ")}`
      : "선택된 산업이 없습니다.";

  return (
    <>
      <FilterContainer>
        {tabOptions.map((tab) => (
          <FilterButton
            key={tab.id}
            selected={selectedTabIds.includes(tab.id)} // 배열에 해당 ID가 있는지 확인
            onClick={() => handleTabSelect(tab.id)}
          >
            {tab.label}
          </FilterButton>
        ))}
      </FilterContainer>
      <FilteredDataContainer>{filteredData}</FilteredDataContainer>
    </>
  );
};

export default Tab;
