import React from 'react';
import styled from 'styled-components';
import FortuneCookieContent from './FortuneCookieContent';
import BGImage from '@assets/fortuneCookieBG.png';
// 전체 페이지 컨테이너
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background-image: url(${BGImage});
  background-color: #93d5f5;
  min-height: 100vh;
  text-align: center;
`;
const Container = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 700px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
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
      <Container>
        <Title>오늘의 포춘 쿠키</Title>
        <Date>2024년 10월 07일</Date>
        <FortuneCookieContent />
        {/* 포춘 쿠키 콘텐츠 컴포넌트 삽입 */}
      </Container>
    </PageContainer>
  );
};

export default FortunePage;
