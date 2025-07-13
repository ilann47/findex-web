import React, { createContext, useContext } from 'react';
import { TravelDTO } from '@/types/travel';

interface TravelContextValue {
  travel: TravelDTO | null;
}

const TravelContext = createContext<TravelContextValue | undefined>(undefined);

interface TravelProviderProps {
  travel: TravelDTO | null;
  children: React.ReactNode;
}

export const TravelProvider: React.FC<TravelProviderProps> = ({
  travel,
  children
}) => {
  return (
    <TravelContext.Provider value={{ travel }}>
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (context === undefined) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
};
