import React, { createContext, useState, useContext } from 'react';

type MenuContextType = {
  menuItems: any[];
  addMenuItem: (item: any) => void;
  removeMenuItem: (index: number) => void;
};

/**
 * code attribution
 * This method was taken from stackoverflow
 * https://stackoverflow.com/questions/64762225/react-context-api-with-typescript-generic
 * Jerryc
 * https://stackoverflow.com/users/4354624/jerryc
 */
const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<any[]>([
   
  ]);

  const addMenuItem = (item: any) => {
    setMenuItems([...menuItems, item]);
  };

  const removeMenuItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, removeMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

