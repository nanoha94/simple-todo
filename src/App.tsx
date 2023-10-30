import "./App.css";
import styled from "@emotion/styled";
import Home from "./pages/Home";

const Container = styled.div`
  width: 400px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

function App() {
  return (
    <Container>
      <Home />
    </Container>
  );
}

export default App;
