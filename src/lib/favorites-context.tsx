"use client";

import { createContext, useContext, useCallback, ReactNode } from "react";
import { useLocalStorage } from "./use-local-storage";

interface FavoritesContextValue {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue>({
  favoriteIds: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useLocalStorage<string[]>("gacubes-favorites", []);

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavoriteIds((prev) =>
        prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
      );
    },
    [setFavoriteIds]
  );

  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds]
  );

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
