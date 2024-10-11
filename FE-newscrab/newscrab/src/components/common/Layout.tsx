import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Nav from './Nav.tsx';

const LayoutContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding-left: 60px;
`;

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Nav />
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};

export default Layout;
