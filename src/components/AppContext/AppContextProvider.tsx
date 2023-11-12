import { createContext, useState } from 'react';
import { AppContextType, ContextProps } from './../types';

const initialContext = {
  gallery: [],
  search: '',
  setGallery: () => [],
  setSearch: () => '',
};

export const AppContext = createContext<AppContextType>(initialContext);

const AppContextProvider = ({ children }: ContextProps) => {
  const [gallery, setGallery] = useState([]);
  const [search, setSearch] = useState(localStorage.getItem('search'));

  const value = { gallery, search, setGallery, setSearch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
