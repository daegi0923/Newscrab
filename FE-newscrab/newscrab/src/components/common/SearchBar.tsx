import { useState } from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const SearchInput = styled.input`
  background-color: #ffffff;
  border: none;
  padding: 10px;
  font-size: 16px;
  outline: none;
  width: 100%;
  border-radius: 20px;
  padding-left: 40px;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 15px;
  font-size: 16px;
  color: #888;
`;

interface ClearButtonProps {
  isVisible: boolean;
}

const ClearButton = styled.span<ClearButtonProps>`
  position: absolute;
  right: 15px;
  font-size: 16px;
  color: #888;
  cursor: pointer;
  display: ${({ isVisible }: { isVisible: boolean }) => (isVisible ? 'block' : 'none')};
`;

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  const handleClear = () => {
    setSearchText(''); // 입력값을 초기화
  };

  return (
    <SearchBarContainer>
      <SearchIcon>🔍</SearchIcon>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <ClearButton isVisible={searchText.length > 0} onClick={handleClear}>
        ✕
      </ClearButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
