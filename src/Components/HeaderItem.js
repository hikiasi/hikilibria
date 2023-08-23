import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Popular from "./Popular";
import { useGlobalContext } from '../context/global';

const HeaderItem = () => {
    const { getChangesAnime} = useGlobalContext();
  return (
    <Header>
      <div className="logo-links">
        <HomeLink to={`/`}>Hikilibria</HomeLink>
        <nav className="links">
          <div>
            <LinkAnime to={`/scheduled/`}>Расписание</LinkAnime>
          </div>
          <div>
            <LinkAnime to={`/changes/`} onClick={getChangesAnime}>Обновления</LinkAnime>
          </div>
          <div>
            <LinkAnime to={`/random/`}>Случайное</LinkAnime>
          </div>
        </nav>
      </div>
      <div className="searchContainer">
        <SearchBar />
      </div>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  margin: 10px;
  align-items: center;
  justify-content: start;
  border-radius: 0.5rem;
  padding: 15px;
  background-color: #1d1d1dcc;
  .logo-links {
    display: flex;
    flex-direction: row;
  }
  .links {
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
  }
  .searchContainer {
    position: relative;
    max-width: 700px;
    width: 100%;
  }
`;

const HomeLink = styled(Link)`
  display: flex;
  text-decoration: inherit;
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  padding-right: 20px;
`;
const LinkAnime = styled(Link)`
  display: flex;
  text-decoration: inherit;
  margin-right: 1.25rem;
  color: #939393;
  font-size: 16px;
  &:hover {
    color: #ff005c;
    transition-duration: 0.3s;
  }
`;

export default HeaderItem;
