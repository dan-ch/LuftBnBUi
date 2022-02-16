import React, { createContext, Dispatch, useReducer } from 'react';

export enum SearchActions {
  setStartDate = 'SET_START_DATE',
  setEndDate = 'SET_END_DATE',
  setCity = 'SET_CITY',
  setPeople = 'SET_PEOPLE',
}

type ISearchActions = {
  type: SearchActions;
  payload: Date | string | number;
}

type IState = {
  startDate: Date;
  endDate: Date;
  city: string;
  people: number;
}

const initialState: IState = {
  startDate: new Date(),
  endDate: new Date(Date.now() + 86400000),
  city: '',
  people: 1,
};

export const SearchContext = createContext<{ state: IState, dispatch: Dispatch<ISearchActions> }>({
  state: initialState,
  dispatch: () => null
});



const searchReducer = (state: IState, action: ISearchActions) => {
  const { type, payload } = action;

  switch (type) {
    case SearchActions.setCity:
      return {
        ...state,
        city: payload as string,
      };
    case SearchActions.setPeople:
      return {
        ...state,
        people: payload as number,
      };
    case SearchActions.setStartDate:
      return {
        ...state,
        startDate: payload as Date,
      };
    case SearchActions.setEndDate:
      return {
        ...state,
        endDate: payload as Date,
      };
    default:
      return state;
  }
};


interface SearchContextProps {
  children: JSX.Element;
}


export const SearchProvider: React.FC<SearchContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

