"use client";

import { createContext, useContext, useState } from "react";

type ListItem = {
  name: string;
  quantity: number;
  icon: JSX.Element;
};

const ListContext = createContext({
  list: [] as ListItem[],
  setList: (list: ListItem[]) => {},
});

const ListProvider = ({ children }: { children: React.ReactNode }) => {
  const [list, setList] = useState<ListItem[]>([]);

  return (
    <ListContext.Provider value={{ list, setList }}>
      {children}
    </ListContext.Provider>
  );
};

const useList = () => {
  const context = useContext(ListContext);
  if (context === undefined) {
    throw new Error("useList must be used within a ListProvider");
  }
  return context;
};

export { ListProvider, useList };
