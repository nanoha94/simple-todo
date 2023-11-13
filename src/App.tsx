import "./App.css";
import styled from "@emotion/styled";
import Header from "./components/Header";
import Router from "./Router";

const Main = styled.main`
  max-width: 760px;
  width: 100%;
  margin: 0 auto;
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
