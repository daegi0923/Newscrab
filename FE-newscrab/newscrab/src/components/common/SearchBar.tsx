import React from "react";
import styled from "styled-components";

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
  const handleClear = () => {
    onSearchChange(""); // Clear the input when the clear button is clicked
  };

  return (
    <Container>
      <SearchBarContainer>
        <SearchIcon>🔍</SearchIcon>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)} // Trigger search on change
        />
        <ClearButton $isVisible={searchText.length > 0} onClick={handleClear}>
          ✕
        </ClearButton>
      </SearchBarContainer>
    </Container>
  );
};

export default SearchBar;
