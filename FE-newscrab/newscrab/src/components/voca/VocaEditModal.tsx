import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

const VocaEditModal: React.FC<VocaModalProps> = ({ isOpen, onClose, word, onUpdate }) => {
  const [vocaName, setVocaName] = useState(word.vocaName);
  const [vocaDesc, setVocaDesc] = useState(word.vocaDesc);
  const [sentence, setSentence] = useState(word.sentence);
  const [newsId, setNewsId] = useState(word.newsId);
  const [industryId, setIndustryId] = useState(word.industryId);

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
      industryId
    });
    onClose();
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
        <div>
          <Input
            type="number"
            value={industryId}
            onChange={(e) => setIndustryId(Number(e.target.value))}
            placeholder="산업 ID를 입력하세요"
          />
        </div>
        <div>
          <Button onClick={onClose}>닫기</Button>
          <Button onClick={handleSave}>수정하기</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default VocaEditModal;
