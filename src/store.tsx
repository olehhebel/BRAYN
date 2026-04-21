import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react';
import type { AppState } from './types';

const initial: AppState = {
  braynName: '',
  whoAreYou: '',
  goal: '',
  timeBudget: '',
  route: null,
};

type Action =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_WHO'; payload: string }
  | { type: 'SET_GOAL'; payload: string; route: AppState['route'] }
  | { type: 'SET_TIME'; payload: string }
  | { type: 'RESET' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_NAME': return { ...state, braynName: action.payload };
    case 'SET_WHO': return { ...state, whoAreYou: action.payload };
    case 'SET_GOAL': return { ...state, goal: action.payload, route: action.route };
    case 'SET_TIME': return { ...state, timeBudget: action.payload };
    case 'RESET': return initial;
    default: return state;
  }
}

const StateCtx = createContext<AppState>(initial);
const DispatchCtx = createContext<Dispatch<Action>>(() => {});

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);
  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={dispatch}>
        {children}
      </DispatchCtx.Provider>
    </StateCtx.Provider>
  );
}

export const useAppState = () => useContext(StateCtx);
export const useAppDispatch = () => useContext(DispatchCtx);
