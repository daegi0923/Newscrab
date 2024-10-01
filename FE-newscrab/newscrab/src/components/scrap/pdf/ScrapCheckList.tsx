import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchScrapListThunk } from '@store/scrap/scrapSlice';
import { AppDispatch, RootState } from '@store/index';
import { useEffect } from 'react';
import styled from 'styled-components';

// 모달 스타일 적용
const ModalBody = styled.section`
  padding: 24px 0;
  overflow-y: auto;
  max-height: 60vh;
`;

const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #ddd;
`;

const ModalTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const ModalFooter = styled.footer`
  display: flex;
  justify-content: center;
  padding-top: 16px;
  border-top: 1px solid #ddd;
  background-color: #f7f7f7;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

interface ChecklistProps {
  onProceedToPreview: (selectedScraps: number[]) => void; // 선택한 스크랩 ID들을 미리보기로 전달하는 함수
}

const ScrapChecklist: React.FC<ChecklistProps> = ({ onProceedToPreview }) => {
  const dispatch: AppDispatch = useDispatch();
  const { scrapList } = useSelector((state: RootState) => state.scrap);
  const [selectedScraps, setSelectedScraps] = useState<number[]>([]); // 선택된 스크랩 ID를 저장

  useEffect(() => {
    dispatch(fetchScrapListThunk()); // Scrap 리스트 API 요청
  }, [dispatch]);

  const handleCheckboxChange = (scrapId: number) => {
    setSelectedScraps((prevSelected) =>
      prevSelected.includes(scrapId)
        ? prevSelected.filter((id) => id !== scrapId) // 선택 해제
        : [...prevSelected, scrapId] // 선택
    );
  };

  const handleProceed = () => {
    onProceedToPreview(selectedScraps); // 선택한 스크랩을 미리보기 페이지로 넘김
  };

  return (
    <>
      <ModalHeader>
        <ModalTitle>스크랩 선택</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <ul>
          {scrapList.map((scrap) => (
            <li key={scrap.scrapId}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedScraps.includes(scrap.scrapId)}
                  onChange={() => handleCheckboxChange(scrap.scrapId)}
                />
                {scrap.newsTitle}
              </label>
            </li>
          ))}
        </ul>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleProceed}>미리보기로 이동</Button>
      </ModalFooter>
    </>
  );
};

export default ScrapChecklist;
