import React, { createContext, useState, ReactNode, useContext } from "react";
import { ScrapData } from "../../types/scrapTypes";

interface ScrapContextProps {
  scrapList: ScrapData[];
  setScrapList: (list: ScrapData[]) => void;
}

const ScrapContext = createContext<ScrapContextProps | undefined>(undefined);

export const useScrapContext = () => {
  const context = useContext(ScrapContext);
  if (!context) {
    throw new Error("useScrapContext must be used within a ScrapProvider");
  }
  return context;
};

export const ScrapProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [scrapList, setScrapList] = useState<ScrapData[]>([]);

  return (
    <ScrapContext.Provider value={{ scrapList, setScrapList }}>
      {children}
    </ScrapContext.Provider>
  );
};
