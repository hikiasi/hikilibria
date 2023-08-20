import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { posterUrl } from "../context/global";
import styled from "styled-components";

const Anime = () => {
  const { id } = useParams();

  //state
  const [anime, setAnime] = React.useState({});
  const [franchise, setFranchise] = React.useState({});
  const [showMore, setShowMore] = React.useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

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
  };

  //get franchises based on id
  const getFranchises = async (anime) => {
    try {
      const response = await fetch(
        `https://api.anilibria.tv/v3.0/title?id=${anime}&filter=id,names,franchises,genres,description,season,status.string,type.full_string,player&remove=torrents`
      );
      const data = await response.json();

      //Проверяем, не пуст ли массив "франшизы"
      if (data.franchises && data.franchises.length > 0) {
        setFranchise(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Устанавливаем значение false для загрузки независимо
    }
  };

  useEffect(() => {
    getAnime(id);
    getFranchises(id);
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
              allow="fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture"
              frameBorder={0}
            ></iframe>
          </div>
        </DesignPlayer>
      </DesignOuterTitle>
      {franchise?.franchises && franchise.franchises.length > 0 && (
        <DesignOuterFranchises>
          <>
            <h2>Связанные релизы</h2>
            {/* Переделать на SwiperJS */}
            {!loading && franchise?.franchises[0]?.releases && (
              <div className="swiperFranchises">
                <div className="swiperWrapper">
                  {franchise.franchises[0].releases.map((release) => (
                    <SwiperSlide key={release.id}>
                      <AnimeCardTitleLink
                        to={`/anime/${release.id}`}
                        onClick={() => {
                          navigate(`/anime/${release.id}`);
                        }}
                        key={release.id}
                      >
                        <AnimeCardTitleImg
                          src={`${posterUrl}${release.id}.webp`}
                          alt={release.code}
                        />
                      </AnimeCardTitleLink>
                    </SwiperSlide>
                  ))}
                </div>
              </div>
            )}
          </>
        </DesignOuterFranchises>
      )}
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
const DesignOuterFranchises = styled.div`
  background-color: #1d1d1dcc;
  border-radius: 20px;
  margin: 10px 20px;
  max-width: 1400px;
  padding: 20px 0;
  text-align: center;
  width: 100%;
  h2 {
    color: white;
    font-size: 32px;
    margin-bottom: 10px;
    margin-top: 0;
  }
  .swiperFranchises {
    touch-action: pan-y;
    display: block;
    list-style: none;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    overflow: clip;
    padding: 0;
    position: relative;
    z-index: 1;
  }
  .swiperWrapper {
    box-sizing: initial;
    display: flex;
    height: 100%;
    position: relative;
    width: 100%;
    z-index: 1;
  }
`;
const SwiperSlide = styled.div`
  width: 200px;
  margin-right: 40px;
  display: block;
  flex-shrink: 0;
  height: 100%;
  position: relative;
`;
const AnimeCardTitleLink = styled(Link)`
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 25px;
  max-height: 100%;
  max-width: 187px;
  text-decoration: none;
  transform: scale(1);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
    transition: all 0.3s ease;
  }
`;
const AnimeCardTitleImg = styled.img`
  border-radius: 20px;
  width: 100%;
  height: 100%; // Allow the image to adjust its height
  object-fit: cover;
`;

export default Anime;
