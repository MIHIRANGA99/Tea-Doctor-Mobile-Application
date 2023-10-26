import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ILanguage } from '../interfaces/ILanguage';

type LanguageAction = { type: 'CHANGE_LANGUAGE'; payload: string };

interface LanguageContextType {
  state: ILanguage;
  dispatch: React.Dispatch<LanguageAction>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const initialState: ILanguage = {
  language: 'English',
};

const languageReducer = (state: ILanguage, action: LanguageAction): ILanguage => {
  switch (action.type) {
    case 'CHANGE_LANGUAGE':
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(languageReducer, initialState);

  return (
    <LanguageContext.Provider value={{ state, dispatch }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};
