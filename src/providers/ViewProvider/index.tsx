import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

type ViewType = 'edit' | 'view' | 'idle' | 'presets' | 'analysis';

interface ViewContextType {
  currentView: ViewType;
  setCurrentView: Dispatch<SetStateAction<ViewType>>;
  toggleSidePanel: () => void;
  sidePanelVisible: boolean;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('idle');
  const [sidePanelVisible, setSidePanelVisible] = useState<boolean>(true);

  const toggleSidePanel = () => {
    setSidePanelVisible(prevState => !prevState);
  };

  return (
    <ViewContext.Provider value={{
      currentView,
      setCurrentView,
      sidePanelVisible,
      toggleSidePanel,
    }}>
      {children}
    </ViewContext.Provider>
  );
};

const useViewProvider = (): ViewContextType => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useViewProvider must be used within a ViewProvider');
  }
  return context;
};

export default useViewProvider;