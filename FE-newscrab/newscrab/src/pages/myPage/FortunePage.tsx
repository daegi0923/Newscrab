import React from 'react';
import styled from 'styled-components';
import FortuneCookieContent from './FortuneCookieContent';

// 전체 페이지 컨테이너
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f9f7f7;
  text-align: center;
`;

// 제목과 설명을 위한 스타일
const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const Date = styled.p`
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 10px;
`;


const FortunePage: React.FC = () => {
  
  return (
    <PageContainer>
      <Title>오늘의 포춘 쿠키</Title>
      <Date>2024년 10월 07일</Date>
      <FortuneCookieContent />
      
      {/* 포춘 쿠키 콘텐츠 컴포넌트 삽입 */}
    </PageContainer>
  );
};

export default FortunePage;
