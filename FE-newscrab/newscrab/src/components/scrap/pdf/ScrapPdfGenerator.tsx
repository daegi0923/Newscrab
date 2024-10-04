import React, { useState } from 'react';
import ScrapChecklist from './ScrapCheckList';
import ScrapPreview from './ScrapPreview';
import styled from 'styled-components';


const ScrapPdfGenerator: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false); // 모달 상태 관리
  const [page, setPage] = useState(1);
  const moveToNext = () => {
    setPage(page + 1);
  };
  const moveToPrev = () => {
    setPage(page - 1);
  };


  const pageInfo: { [key: number]: { title: string; content: any; prevButton: any; nextButton: any } } = {
    1: {
      title: '스크랩 선택',
      content: <ScrapChecklist funcChangePage={moveToNext}></ScrapChecklist>,
      prevButton: null,
      nextButton: {
        text: '다음',
        func: moveToNext,
      },
    },
    2: {
      title: '미리보기',
      content: <ScrapPreview funcChangePage={moveToPrev}></ScrapPreview>,
      prevButton: {
        text: '이전',
        func: moveToPrev,
      },
      nextButton: null,
    },
  };
  const handleToggleModalVisible = () => {
    setModalVisible(!isModalVisible); // 미리보기 닫기
    setPage(1);
  };

  return (
    <div>
      {/* 오른쪽 하단의 플로팅 버튼 */}
      <FloatingButton onClick={handleToggleModalVisible}>{isModalVisible ? '닫기' : 'PDF 내보내기'}</FloatingButton>
      {isModalVisible ? (
        <ModalOverlay>
          <ModalBody>
            <ModalHeader>
              <ModalTitle>{pageInfo[page].title}</ModalTitle>
            </ModalHeader>
            <ModalContent>{pageInfo[page].content}</ModalContent>
            {/* <ModalFooter>
              {pageInfo[page].prevButton ? (
                <Button onClick={pageInfo[page].prevButton?.func}>{pageInfo[page].prevButton?.text}</Button>
              ) : <div></div>}
              {pageInfo[page].nextButton ? (
                <Button onClick={pageInfo[page].nextButton?.func}>{pageInfo[page].nextButton?.text}</Button>
              ) : <></>}
            </ModalFooter> */}
          </ModalBody>
        </ModalOverlay>
      ) : null}
    </div>
  );
};
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
const ModalBody = styled.section`
  width: 80vw;
  background-color: white;
  border-radius: 16px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.25);
  position: relative;

`;

// 모달 컨텐츠 스타일 정의
const ModalContent = styled.article`
overflow-y: auto;
`;
const ModalHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height : 8vh;
  border-bottom : 1px solid #ddd;
  margin-bottom : 5px;
`;

const ModalTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-align: center;
`;

export default ScrapPdfGenerator;
