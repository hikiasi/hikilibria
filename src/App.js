import { BrowserRouter, Route, Routes } from "react-router-dom";
import Popular from "./Components/Popular";
import AnimeItem from "./Components/AnimeItem";
import styled from "styled-components";
import FooterItem from "./Components/FooterItem";
import HeaderItem from './Components/HeaderItem';

const Wrapper = styled.div`
  background-color: #141414;
`;

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <HeaderItem />
        <Routes>
          <Route path="/" element={<Popular />} />
          <Route path="/anime/:id" element={<AnimeItem />} />
        </Routes>
        <FooterItem />
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
