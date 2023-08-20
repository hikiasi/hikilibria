import { BrowserRouter, Route, Routes } from "react-router-dom";
import Popular from "./Components/Popular";
import AnimeItem from "./Components/AnimeItem";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #141414;
`;

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Popular />} />
          <Route path="/anime/:id" element={<AnimeItem />} />
          
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
