import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { topTabOptions, bottomTabOptions } from "./TabOptions";
import hotImage from "@assets/hot.png";
import scrapImage from "@assets/scrap.png";
import allImage from "@assets/all.png";

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between; /* Tab과 추천 뉴스 보기를 양쪽에 배치 */
  align-items: center;
  margin-top: 10px;
  padding: 0 100px; /* 좌우 패딩 추가 */
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-left: 36%;
`;

// 상단 탭 버튼 스타일
const TopTabButton = styled.button<{ selected: boolean }>`
  padding: 8px 16px;
  margin: 0 10px;
  border: none;
  background-color: transparent;
  color: #555;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #4370e3;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  span {
    position: relative;
    color: ${(props) => (props.selected ? "#4370e3" : "#555")};
    transition: color 0.3s ease; /* 텍스트 색상도 부드럽게 변환 */
    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #4370e3;
      bottom: -4px;
      left: 0;
      transition: all 0.3s ease; /* 언더바 애니메이션 */
      transform: scaleX(
        ${(props) => (props.selected ? 1 : 0)}
      ); /* 선택되지 않은 경우에는 언더바 숨김 */
      transform-origin: left; /* 애니메이션이 왼쪽에서 오른쪽으로 */
    }
  }
`;

const GoRcmdNews = styled.div`
  color: #007bff;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

// 하단 필터 버튼 스타일
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

interface TabProps {
  onIndustrySelect: (industryId: number | null) => void;
  onOptionSelect: (option: string) => void; // 상단 탭 선택 시 호출될 함수 추가
}

const Tab: React.FC<TabProps> = ({ onIndustrySelect, onOptionSelect }) => {
  const [selectedTopTab, setSelectedTopTab] = useState<number>(1); // 상단 탭 상태
  const [selectedBottomTab, setSelectedBottomTab] = useState<number | null>(
    null
  ); // 하단 필터 상태, 하나만 선택 가능하도록 수정

  // 상단 탭 선택 시 상태 업데이트 및 option 전달
  const handleTopTabSelect = (tabId: number, option: string) => {
    setSelectedTopTab(tabId);
    onOptionSelect(option); // 선택된 option 값을 상위 컴포넌트로 전달
  };

  const getTabImage = (tabName: string) => {
    if (tabName === "전체") return allImage;
    if (tabName === "조회수") return hotImage;
    if (tabName === "스크랩수") return scrapImage;
  };

  const navigate = useNavigate(); // useNavigate 훅 사용

  // 하단 필터 버튼 선택 시 상태 업데이트
  const handleBottomTabSelect = (tabId: number) => {
    const newSelectedId = selectedBottomTab === tabId ? null : tabId; // 이미 선택된 탭 클릭 시 선택 해제
    setSelectedBottomTab(newSelectedId); // 선택된 탭 업데이트
    onIndustrySelect(newSelectedId); // 선택된 ID 전달
  };

  const handleGoRcmdNews = () => {
    navigate("/rcmdNews");
  };

  return (
    <>
      {/* 상단 탭과 추천 뉴스 보기를 묶는 컨테이너 */}
      <TopWrapper>
        <TabContainer>
          {topTabOptions.map((tab) => (
            <TopTabButton
              key={tab.id}
              selected={selectedTopTab === tab.id}
              onClick={() => handleTopTabSelect(tab.id, tab.label)}
            >
              {getTabImage(tab.name) && (
                <img src={getTabImage(tab.name)} alt="" />
              )}
              <span>{tab.name}</span>
            </TopTabButton>
          ))}
        </TabContainer>
        <GoRcmdNews onClick={handleGoRcmdNews}>🔍 추천 뉴스 보기</GoRcmdNews>
      </TopWrapper>
      {/* 하단 필터 버튼 */}
      <FilterContainer>
        {bottomTabOptions.map((tab) => (
          <FilterButton
            key={tab.id}
            selected={selectedBottomTab === tab.id} // 하나만 선택되도록 수정
            onClick={() => handleBottomTabSelect(tab.id)}
          >
            {tab.label}
          </FilterButton>
        ))}
      </FilterContainer>
    </>
  );
};

export default Tab;
