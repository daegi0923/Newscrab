import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Nav from './Nav'; // 네비게이션 컴포넌트

// styled-components 정의
const LayoutContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding-left: 60px;
`;

// Layout 컴포넌트 정의
interface LayoutProps {
  children: ReactNode;  // children의 타입을 명시
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      {/* 모든 페이지에서 공통으로 사용할 네비게이션 바 */}
      <Nav />

      {/* 네비게이션 바 오른쪽에 표시될 콘텐츠 */}
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};

export default Layout;
