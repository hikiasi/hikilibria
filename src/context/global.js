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

  //fetch popular anime
  const getUpdatesAnime = async () => {
    dispatch({ type: LOADING });
    const totalPages = 3;
    const itemsPerPage = 15;
    const allUpdatesAnime = [];
    
    // for (let page = 1; page <= totalPages; page++) {
    const response = await fetch(`${baseUrl}/title/updates?filter=id,code,names,posters,genres,description?page=1&items_per_page=50`);
    const data = await response.json();
    allUpdatesAnime.push(...data.list);
    // }
    dispatch({ type: GET_UPDATES_ANIME, payload: allUpdatesAnime });
};

  //initial render
  React.useEffect(() => {
    getUpdatesAnime();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
