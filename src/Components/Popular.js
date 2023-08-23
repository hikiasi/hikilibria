import React from "react";
import { useGlobalContext } from "../context/global";
import { Link } from "react-router-dom";
import { posterUrl } from "../context/global";
import styled from "styled-components";
import NotFound from "../img/NotFound.png";

const Popular = () => {
  const { updatesAnime, isSearch, searchResults } = useGlobalContext();

  const conditionalRender = () => {
    if (!isSearch) {
      return updatesAnime.map((anime) => (
        <AnimeLink to={`/anime/${anime.id}`} key={anime.id}>
          <AnimeCard>
            <AnimeCardImg
              src={`${posterUrl}${anime.id}.webp`}
              alt={anime.code}
            />
            <AnimeCardContent>
              <div className="title">
                <h3>{anime.names.ru}</h3>
              </div>
              <div className="genres">
                {anime.genres.map((genre, index) => (
                  <p key={index}>{genre}</p>
                ))}
              </div>
            </AnimeCardContent>
          </AnimeCard>
        </AnimeLink>
      ));
    } else if (searchResults.length > 0) {
      return searchResults.map((anime) => (
        <AnimeLink to={`/anime/${anime.id}`} key={anime.id}>
          <AnimeCard>
            <AnimeCardImg
              src={`${posterUrl}${anime.id}.webp`}
              alt={anime.code}
            />
            <AnimeCardContent>
              <div className="title">
                <h3>{anime.names.ru}</h3>
              </div>
              <div className="genres">
                {anime.genres.map((genre, index) => (
                  <p key={index}>{genre}</p>
                ))}
              </div>
            </AnimeCardContent>
          </AnimeCard>
        </AnimeLink>
      ));
    } else {
      return (
        <div className="center-grid-item">

        <SorrySearch>
          <img src={NotFound} alt="notFound" loading="lazy" />
          <h2>Ничего не найдено :(</h2>
        </SorrySearch>
        </div>
      );
    }
  };

  return (
      <PopularStyled>
        <div className="popular-anime">{conditionalRender()}</div>
      </PopularStyled>
  );
};

const PopularStyled = styled.div`
  display: flex;
  .popular-anime {
    margin-top: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2rem;
    background-color: #141414;
    border-top: 5px solid #2c2c2c;
    overflow: hidden;
  }
  .center-grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: span 5; // Adjust the grid-column span based on your grid layout
  }
  overflow: hidden;
`;

const AnimeLink = styled(Link)`
  text-decoration: none;
`;

const AnimeCard = styled.div`
  border-radius: 30px;
  border: 10px solid #2c2c2c;
  background-color: #2c2c2c;
  overflow: hidden; // To ensure everything inside fits within the border
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const AnimeCardImg = styled.img`
  width: 100%;
  height: 100%; // Allow the image to adjust its height
  object-fit: cover;
  border-radius: 10px 10px;
`;

const AnimeCardContent = styled.div`
  padding: 1rem 0.5rem;
  background-color: #2c2c2c;
  display: inline-block;
  width: 100%;
  height: 100px;
  overflow: hidden;

  .title {
    h3 {
      color: white;
      margin: 0;
      margin-left: 0.25rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 100%;
    }
  }

  .genres {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;

    p {
      background-color: #2c2c2c;
      padding: 0.25rem 0.25rem;
      border-radius: 5px;
      color: #bbbbbb;
      font-size: 14px;
    }
  }
`;

const SorrySearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  img {
    height: auto;
    max-width: 150px;
    display: block;
  }
  h2 {
    text-align: center;
    margin: 0;
    margin-bottom: 0.75rem;
    font-size: 1.5rem;
    line-height: 2rem;
    color: #fff;
  }
`;

export default Popular;
