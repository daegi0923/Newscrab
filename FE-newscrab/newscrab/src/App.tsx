import AppRouter from "./router/AppRouter.tsx";
import GlobalStylesWithHelmet from "@components/GlobalStyle.tsx";
import './font/font.css'


function App() {
  return (
    <>
      <GlobalStylesWithHelmet />
      <AppRouter />
    </>
  );
}

export default App;
