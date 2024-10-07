import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { debounce } from "lodash";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-top: 18px;
  border: solid 1px #666;
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
  $isVisible: boolean;
}

const ClearButton = styled.span<ClearButtonProps>`
  position: absolute;
  right: 15px;
  font-size: 16px;
  color: #888;
  cursor: pointer;
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
`;

interface SearchBarProps {
  searchText: string;
  onSearchChange: (searchValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  onSearchChange,
}) => {
  const [inputValue, setInputValue] = useState(searchText);

  // inputValue가 변경될 때 debounce를 직접 실행
  useEffect(() => {
    const debouncedChange = debounce((value: string) => {
      onSearchChange(value);
    }, 500);

    debouncedChange(inputValue);

    return () => {
      debouncedChange.cancel(); // 언마운트 시 debounce 정리
    };
  }, [inputValue, onSearchChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue(""); // Clear input value
    onSearchChange(""); // 즉시 검색어 초기화
  };

  return (
    <Container>
      <SearchBarContainer>
        <SearchIcon>🔍</SearchIcon>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={handleChange}
        />
        <ClearButton $isVisible={inputValue.length > 0} onClick={handleClear}>
          ✕
        </ClearButton>
      </SearchBarContainer>
    </Container>
  );
};

export default SearchBar;
