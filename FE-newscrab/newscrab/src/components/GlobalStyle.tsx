import { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import scrollbar from "@common/ScrollBar";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    box-sizing: border-box;
    font-family: 'SUIT Variable', sans-serif; /* 기본 폰트 적용 */
  }

  #root {
    height: 100%;
  }

  body {
    background-color: #FDFAF8;
    ${scrollbar}
  }

  // h1, h2 {
  //   font-family: 'Pretendard', sans-serif; /* h1, h2에 Pretendard 폰트 적용 */
  // }
`;

const GlobalStylesWithHelmet: React.FC = () => (
  <>
    <Helmet>
      <link
        href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/pretendard@1.3.6/dist/web/static/pretendard.css"
        rel="stylesheet"
      />
    </Helmet>
    <GlobalStyle />
  </>
);

export default GlobalStylesWithHelmet;
