import "./App.css";
import styled from "@emotion/styled";
import Header from "./components/Header";
import Router from "./Router";

const Main = styled.main`
  width: calc(100% - 40px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

function App() {
  return (
    <>
      <Header />

      <Main>
        <Router />
      </Main>
    </>
  );
}

export default App;
