import AppRouter from "./router/AppRouter.tsx";
import GlobalStylesWithHelmet from "@components/GlobalStyle.tsx";

function App() {
  return (
    <>
      <GlobalStylesWithHelmet />
      <AppRouter />
    </>
  );
}

export default App;
