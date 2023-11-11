import { createContext, useState } from 'react';
import { AppContextType, ContextProps } from './../types';

const initialContext = {
  gallery: [],
  search: '',
  isGallery: (galery: []) => console.log('items'),
};
export const AppContext = createContext<AppContextType>(initialContext);

const AppContextProvider = ({ children }: ContextProps) => {
  const [gallery, setGallery] = useState([]);
  const [search, setSearch] = useState('');

  const isGallery = (data: []) => {
    setGallery(data);
  };

  const value = { gallery: gallery, search: search, isGallery };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
