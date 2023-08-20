import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { posterUrl } from "../context/global";
import styled from "styled-components";

const Anime = () => {
  const { id } = useParams();

  //state
  const [anime, setAnime] = React.useState({});
  const [characters, setCharacters] = React.useState({});
  const [showMore, setShowMore] = React.useState(false);

  //destructure anime
  const {
    names,
    franchises,
    status,
    type,
    genres,
    team,
    description,
    in_favorites,
  } = anime;

  //get anime based on id
  const getAnime = async (anime) => {
    const response = await fetch(
      `https://api.anilibria.tv/v3/title?id=${anime}`
    );
    const data = await response.json();
    setAnime(data);
    console.log(data);
  };

  useEffect(() => {
    getAnime(id);
  }, [id]);

  return (
    <DesignMain>
      <DesignOuterTitle>
        <DesignTitle>
          <DesignPoster>
            <DesignPosterImg
              src={`${posterUrl}${anime.id}.webp`}
              alt={anime.names && anime.names.ru}
            />
          </DesignPoster>
          <DesignTitleText>
            <DesignTitleNameDesc>
              <h1>{names && names.ru}</h1>
              <p>
                {showMore
                  ? description
                  : description?.substring(0, 350) + "..."}{" "}
                <button
                  className="btnMore"
                  onClick={() => {
                    setShowMore(!showMore);
                  }}
                >
                  {showMore ? "Скрыть..." : "Подробнее..."}
                </button>
              </p>
            </DesignTitleNameDesc>
            <DesignAnimeSpec>
              <p>
                <div className="DesignAnimeInfo">
                  <strong>Статус:&nbsp;</strong> <p>{status?.string}</p>
                </div>
                <div className="DesignAnimeInfo">
                  <strong>Жанры:&nbsp;</strong>{" "}
                  <p>
                    {genres?.length > 0 ? genres.join(", ") : "Не найдено :("}
                  </p>
                </div>
                <div className="DesignAnimeInfo">
                  <strong>Тип:&nbsp;</strong> <p>{type?.full_string}</p>
                </div>
                <div className="DesignAnimeInfo">
                  <strong>Озвучка:&nbsp;</strong>{" "}
                  <p>
                    {team?.voice.length > 0
                      ? team.voice.join(", ")
                      : "Не найдено :("}
                  </p>
                </div>
                <div className="DesignAnimeInfo">
                  <strong>Тайминг:&nbsp;</strong>{" "}
                  <p>
                    {team?.timing.length > 0
                      ? team.timing.join(", ")
                      : "Не найдено :("}
                  </p>
                </div>
                <div className="DesignAnimeInfo">
                  <strong>Перевод:&nbsp;</strong>{" "}
                  <p>
                    {team?.translator.length > 0
                      ? team.translator.join(", ")
                      : "Не найдено :("}
                  </p>
                </div>
              </p>
            </DesignAnimeSpec>
          </DesignTitleText>
        </DesignTitle>
        <DesignPlayer>
          <div>
            {/* Тут должен быть плеер */}
            <iframe
              className="player"
              title="player"
              src={`https://www.anilibria.tv/public/iframe.php?id=${anime.id}`}
              allow='fullscreen *'
              frameBorder={0}
            ></iframe>
          </div>
        </DesignPlayer>
      </DesignOuterTitle>
    </DesignMain>
  );
};

const DesignMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const DesignOuterTitle = styled.div`
  align-items: center;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const DesignTitle = styled.div`
  align-items: flex-start;
  display: flex;
  margin: 20px 100px -10px;
  max-width: 65rem;
  width: 100%;
`;

const DesignPoster = styled.div`
  display: flex;
  position: relative;
`;

const DesignPosterImg = styled.img`
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  height: auto;
  max-width: 300px;
`;

const DesignTitleText = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 20px;
`;

const DesignTitleNameDesc = styled.div`
  margin-bottom: 10px;
  h1 {
    color: white;
    line-height: 3.5rem;
  }
  p {
    color: #bbbbbb;
    line-height: 1.9rem;
  }
  .btnMore {
    background-color: #ff005c;
    color: white;
    border: none;
    padding: 0.3rem;
    margin-top: 0.75rem;
    margin-bottom: 0px;
    border-radius: 0.375rem;
    width: 8rem;
    cursor: pointer;
    font-size: 16px;
  }
`;
const DesignAnimeSpec = styled.div`
  font-size: 20px;
  p {
    color: #bbbbbb;
  }
  strong {
    color: white;
  }
  .DesignAnimeInfo {
    display: flex;
    padding-bottom: 0.5rem;
  }
`;
const DesignPlayer = styled.div`
  margin-top: 50px;
  max-width: 65rem;
  width: 100%;
  .player {
    border-radius: 20px;
    width: 100%;
    height: 550px;
  }
`;

export default Anime;
