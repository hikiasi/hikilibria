import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/global";
import { ReactComponent as SearchSVG } from "../img/search.svg";

const SearchBar = () => {
  const { handleSubmit, search, searchAnime, handleChange, isSearch } =
    useGlobalContext();

  return (
    <SearchBox>
      <SearchLoading>
        <input
          className="search"
          placeholder="Найти аниме"
          value={search}
          onChange={handleChange}
        />
        <div className="filter" onClick={handleSubmit}>
          <SearchSVG className="search-icon" />
        </div>
      </SearchLoading>
    </SearchBox>
  );
};

const SearchLoading = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-content: center;
  .search {
    display: flex;
    margin-right: 0.25rem;
    height: 2.5rem;
    min-width: 0;
    border-radius: 0.5rem;
    border-width: 0;
    background-color: #141414;
    padding: 0.25rem;
    text-align: center;
    font-size: 16px;
    line-height: 1.5rem;
    color: #7a7a7a;
    outline: 2px solid transparent;
    outline-offset: 2px;
    width: 100%;
  }
  .search::placeholder {
    color: #7a7a7a;
  }
  .filter {
    display: flex;
    border: 0;
    background-color: #141414;
    width: 50px;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border-width: 0;
    margin-left: 0.25rem;
  }
`;
const SearchBox = styled.div`
  position: relative;
  margin-left: 1rem;
  margin-right: 1rem;
  display: flex;
  min-width: 0;
  max-width: 700px;
  flex-direction: row;
  cursor: pointer;
`;

export default SearchBar;
