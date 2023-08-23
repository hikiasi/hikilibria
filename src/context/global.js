import React, { createContext, useContext } from "react";
import { useReducer } from "react";

const GlobalContext = createContext();

export const baseUrl = "https://api.anilibria.tv/v3";
export const posterUrl = "https://api.litelibria.com/posters/";

//actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_UPDATES_ANIME = "GET_UPDATES_ANIME";
const GET_CHANGES_ANIME = "GET_CHANGES_ANIME";
const GET_SCHEDULE_ANIME = "GET_SCHEDULE_ANIME";

//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_UPDATES_ANIME:
      return { ...state, updatesAnime: action.payload, loading: false };
    case SEARCH:
      return { ...state, searchResults: action.payload, loading: false };
    case GET_CHANGES_ANIME:
      return { ...state, changesAnime: action.payload, loading: false };
    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  //initial state
  const initialState = {
    updatesAnime: [],
    changesAnime: [],
    scheduleAnime: [],
    pictures: [],
    isSearch: false,
    searchResults: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = React.useState("");

  //handle change
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      state.isSearch = false;
    }
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      searchAnime(search);
      state.isSearch = true;
    } else {
      state.isSearch = false;
      alert("Пожалуйста, введите название для поиска");
    }
  };

  //fetch popular anime
  const getUpdatesAnime = async () => {
    dispatch({ type: LOADING });
    const totalPages = 3;
    const itemsPerPage = 15;
    const allUpdatesAnime = [];

    // for (let page = 1; page <= totalPages; page++) {
    const response = await fetch(
      `${baseUrl}/title/updates?filter=id,code,names,posters,genres,description?page=1&items_per_page=50`
    );
    const data = await response.json();
    allUpdatesAnime.push(...data.list);
    // }
    dispatch({ type: GET_UPDATES_ANIME, payload: allUpdatesAnime });
  };

  //fetch changes anime
  const getChangesAnime = async () => {
    dispatch({ type: LOADING });

    // for (let page = 1; page <= totalPages; page++) {
    const response = await fetch(
      `${baseUrl}/title/updates?filter=id,names,posters.medium,player.episodes,description,genres&limit=15`
    );
    const data = await response.json();
    dispatch({ type: GET_CHANGES_ANIME, payload: data.list });
  };

  //fetch schedule anime

  //search anime
  const searchAnime = async (anime) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `${baseUrl}/title/search?search=${search}&filter=id,code,names.ru,posters,genres&limit=10`
    );
    const data = await response.json();
    dispatch({ type: SEARCH, payload: data.list });
  };

  //initial render
  React.useEffect(() => {
    getUpdatesAnime();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        handleChange,
        handleSubmit,
        searchAnime,
        search,
        getUpdatesAnime,
        getChangesAnime,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
