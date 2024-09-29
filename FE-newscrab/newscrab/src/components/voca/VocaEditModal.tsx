import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DropDown from "@components/common/DropDown";
import { words } from "@components/voca/VocaList";

interface VocaModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: {
    vocaId: number;
    vocaName: string;
    vocaDesc: string;
    sentence: string;
    newsId: number;
    industryId: number;
  };
  onUpdate: (updatedWord: {
    vocaId: number;
    vocaName: string;
    vocaDesc: string;
    sentence: string;
    newsId: number;
    industryId: number;
  }) => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2%;
  border-radius: 10px;
  max-width: 800px;
  width: 40%;
  text-align: center;
  align-items: center;
  position: relative; /* 부모 요소에 상대 위치 */
`;

const Button = styled.button`
  margin: 5% 5% 0% 5%;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #e09520;
  }
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 80%;
  height: 150px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
`;

const SelectedIndustry = styled.div`
  margin-top: 10px;
  padding: 10px;
  margin: 0 25%;
  width: 50%;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer; /* hover 시 커서가 pointer로 변경 */
  &:hover {
    background-color: #f1f1f1; /* hover 시 배경 색상 변경 */
  }
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: 75%; /* 선택된 산업군 바로 아래에 드롭다운 표시 */
  width: 80%; /* 드롭다운이 인풋 필드와 동일한 너비로 설정 */
  left: 45%; /* 드롭다운을 중앙에 정렬 */
  z-index: 10;
`;

const VocaEditModal: React.FC<VocaModalProps> = ({
  isOpen,
  onClose,
  word,
  onUpdate,
}) => {
  const [vocaName, setVocaName] = useState(word.vocaName);
  const [vocaDesc, setVocaDesc] = useState(word.vocaDesc);
  const [sentence, setSentence] = useState(word.sentence);
  const [, setNewsId] = useState(word.newsId);
  const [industryId, setIndustryId] = useState(word.industryId);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedIndustryName =
    words.find((ind) => ind.industryId === industryId)?.industryName ||
    "산업을 선택하세요";

  useEffect(() => {
    setVocaName(word.vocaName);
    setVocaDesc(word.vocaDesc);
    setSentence(word.sentence);
    setNewsId(word.newsId);
    setIndustryId(word.industryId);
  }, [word]);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdate({
      vocaId: word.vocaId,
      vocaName,
      vocaDesc,
      sentence,
      newsId: word.newsId,
      industryId,
    });
    onClose();
  };

  const handleIndustrySelect = (id: number) => {
    setIndustryId(id); // Update the selected industry ID
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>단어 수정</h2>
        <div>
          <Input
            type="text"
            value={vocaName}
            onChange={(e) => setVocaName(e.target.value)}
            placeholder="단어 이름을 입력하세요"
          />
        </div>
        <div>
          <TextArea
            value={vocaDesc}
            onChange={(e) => setVocaDesc(e.target.value)}
            placeholder="단어 설명을 입력하세요"
          />
        </div>
        {/* <div>
          <Input
            type="number"
            value={industryId}
            onChange={(e) => setIndustryId(Number(e.target.value))}
            placeholder="산업 ID를 입력하세요"
          />
        </div> */}
        <SelectedIndustry onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {/* Show the selected industry or prompt */}
          {selectedIndustryName}
        </SelectedIndustry>
        {isDropdownOpen && (
          <DropdownWrapper>
            <DropDown
              dropdownIndustries={words}
              handleIndustrySelect={handleIndustrySelect}
            />
          </DropdownWrapper>
        )}

        <div>
          <Button onClick={onClose}>닫기</Button>
          <Button onClick={handleSave}>수정하기</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default VocaEditModal;
