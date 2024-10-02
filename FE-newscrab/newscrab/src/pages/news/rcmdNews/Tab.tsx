import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUsername } from "@apis/news/newsRcmdApi"; // getUsername 함수 import

// 텍스트 전체 스타일링
const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin-top: 20px;
`;

// 사용자 이름 스타일
const Username = styled.span`
  font-weight: bold;
  color: #333;
`;

// "님을 위한 추천 뉴스에요!" 텍스트 스타일
const HighlightText = styled.span`
  font-weight: normal;
  color: #555;
  front-size: 10px;
`;

const Tab: React.FC = () => {
  const [username, setUsername] = useState<string>(""); // 사용자 이름을 저장하는 상태

  // API 호출로 사용자 이름을 가져오는 함수
  const fetchUsername = async () => {
    try {
      const name = await getUsername(); // API에서 사용자 이름 가져오기
      setUsername(name); // 상태에 저장
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  // 컴포넌트가 마운트될 때 사용자 이름을 가져옴
  useEffect(() => {
    fetchUsername();
  }, []);

  return (
    <Message>
      {username ? (
        <>
          🔍 <Username>{username}</Username>
          <HighlightText>님을 위한 추천 뉴스에요!</HighlightText>
        </>
      ) : (
        "추천 뉴스를 로드 중입니다..."
      )}
    </Message>
  );
};

export default Tab;
