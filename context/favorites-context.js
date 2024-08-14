import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

const FavoriteContextProvider = ({ children }) => {
  const [favoriteVideoIds, setFavoriteVideoIds] = useState([]);

  const addFavorite = (id) => {
    setFavoriteVideoIds((currentFavIds) => [...currentFavIds, id]);
  };

  const removeFavorite = (id) => {
    setFavoriteVideoIds((currentFavIds) =>
      currentFavIds.filter((videoId) => videoId !== id)
    );
  };

  const value = {
    ids: favoriteVideoIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite
  }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export default FavoriteContextProvider;
