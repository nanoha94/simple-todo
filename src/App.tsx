import "./App.css";
import styled from "@emotion/styled";
import Home from "./pages/Home";
import Header from "./components/Header";

const Container = styled.div`
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
      <Container>
        <Home />
      </Container>
    </>
  );
}

export default App;
