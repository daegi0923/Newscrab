import React, { useState } from 'react';
import ScrapChecklist from './ScrapCheckList';
import ScrapPreview from './ScrapPreview';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import styled from 'styled-components';

// 플로팅 버튼 스타일 정의
const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

// 모달 오버레이 스타일 정의
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 컨텐츠 스타일 정의
const ModalContent = styled.article`
  background-color: white;
  padding: 24px;
  border-radius: 16px;
  width: 80vw;
  max-width: 90%;
  height : 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.25);
  max-height: 90vh;
  overflow: hidden;
  position: relative;

  @media (max-width: 600px) {
    width: 90%;
  }
`;

const ScrapPdfGenerator: React.FC = () => {
  const [isChecklistVisible, setChecklistVisible] = useState(false); // 체크리스트 모달 상태 관리
  const [selectedScraps, setSelectedScraps] = useState<number[]>([]); // 선택된 스크랩을 저장
  const [isPreviewVisible, setPreviewVisible] = useState(false); // 미리보기 상태 관리
  const { scrapList } = useSelector((state: RootState) => state.scrap); // 전체 스크랩 리스트 가져오기

  const handleProceedToPreview = (selected: number[]) => {
    setSelectedScraps(selected); // 선택된 스크랩 저장
    setPreviewVisible(true); // 미리보기 페이지로 전환
    setChecklistVisible(false); // 체크리스트 모달 닫기
  };

  const handleToggleChecklist = () => {
    setChecklistVisible(!isChecklistVisible); // 체크리스트 모달 열기/닫기
    setPreviewVisible(false); // 미리보기 닫기
  };

  return (
    <div>
      {/* 오른쪽 하단의 플로팅 버튼 */}
      <FloatingButton onClick={handleToggleChecklist}>
        {isChecklistVisible || isPreviewVisible ? '닫기' : 'PDF 내보내기'}
      </FloatingButton>

      {/* 체크리스트 모달 */}
      {isChecklistVisible && (
        <ModalOverlay>
          <ModalContent>
            <ScrapChecklist onProceedToPreview={handleProceedToPreview} />
          </ModalContent>
        </ModalOverlay>
      )}

      {/* 미리보기 모달 */}
      {isPreviewVisible && (
        <ModalOverlay>
          <ModalContent>
            <ScrapPreview selectedScraps={selectedScraps} scrapList={scrapList} />
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export default ScrapPdfGenerator;
