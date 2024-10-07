import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (searchType: string, searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchType, setSearchType] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchType, searchTerm);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        style={{ padding: "5px" }}
      >
        <option value="전체">전체</option>
        <option value="뉴스제목">뉴스제목</option>
        <option value="뉴스번호">뉴스번호</option>
        <option value="산업군">산업군</option>
        <option value="작성자">작성자</option>
      </select>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown} // 엔터 키 이벤트 추가
        placeholder="검색어를 입력하세요"
        style={{ padding: "5px", width: "200px" }}
      />
      <button onClick={handleSearch} style={{ padding: "5px 10px" }}>
        검색
      </button>
    </div>
  );
};

export default SearchBar;
