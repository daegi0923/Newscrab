import { css } from "styled-components";

const scrollbar = css`
  &::-webkit-scrollbar {
    width: 8px; /* 세로 스크롤바의 너비 */
    height: 8px; /* 가로 스크롤바의 높이 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 12px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #666;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export default scrollbar;

// 적용 예시: NewsContent에 적용
// const NewsContent = styled.div`
//   width: 60%;
//   padding-right: 20px;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   padding: 15px 100px;
//   background-color: #fff;
//   max-height: 680px;
//   overflow-y: auto;
//   position: relative;

//   ${scrollbar}; /* 스크롤바 스타일 적용 */
//   user-select: text;
// `;
