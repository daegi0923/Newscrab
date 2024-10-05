import styled from "styled-components";

interface Word {
  industryId: number;
  industryName: string;
}

interface DropdownProps {
  words: Word[];
  handleIndustrySelect: (industryId: number | null) => void;
}

const DropdownMenu = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  left: 5%;
  z-index: 100;
  width: 120px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

  /* 숨겨진 기본 스크롤바 */
  scrollbar-width: thin; /* Firefox용 */
  scrollbar-color: #a0a0a0 transparent;

  /* 웹킷 브라우저용 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent; /* 스크롤 트랙 숨기기 */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d1d1d1; /* 스크롤바 색상 */
    border-radius: 10px; /* 둥근 모서리 */
    border: 2px solid transparent; /* 스크롤바와 트랙 사이 공간 */
    background-clip: padding-box; /* 스크롤바의 내부 패딩 설정 */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #b0b0b0; /* 호버 시 스크롤바 색상 */
  }
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 15px;
  color: #333; /* 더 부드러운 글자색 */
  transition: background-color 0.2s ease-in-out; /* 부드러운 hover 전환 */

  &:hover {
    background-color: #f1f1f1;
    border-radius: 4px; /* hover 시 모서리 둥글게 */
  }
`;

const DropDown: React.FC<DropdownProps> = ({ words, handleIndustrySelect }) => {
  return (
    <DropdownMenu>
      <DropdownItem onClick={() => handleIndustrySelect(null)}>전체</DropdownItem>
      {words.map((option) => (
        <DropdownItem key={option.industryId} onClick={() => handleIndustrySelect(option.industryId)}>
          {option.industryName}
        </DropdownItem>
      ))}
  </DropdownMenu>
  );
};

export default DropDown;
