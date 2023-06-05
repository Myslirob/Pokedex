import React, { useContext, useReducer, useCallback } from 'react';
import { assertNever } from 'assert-never';

import type { ReactNode } from 'react';

type Filter = {
    name: string;
    type: string;
    isFavorite: boolean;
};

interface AppContextData {
    filter: Filter;
    setFilter: (filter: Partial<Filter>) => void;
    view: 'list' | 'grid';
    setView: (view: 'list' | 'grid') => void;
}

const AppContext = React.createContext<AppContextData>({
    filter: {
        isFavorite: false,
        name: '',
        type: '',
    },
    setFilter: () => undefined,
    setView: () => undefined,
    view: 'grid',
});

type Actions = { type: 'setFilter'; payload: Partial<AppContextData['filter']> } | { type: 'setView'; payload: AppContextData['view'] };

export const AppContextProvider = ({ children }: {
    children: ReactNode;
}) => {
    const [ { view, filter }, dispatch ] = useReducer((state: Pick<AppContextData, 'filter' | 'view'>, action: Actions) => {
        if (action.type === 'setFilter') {
            return {
                ...state,
                filter: { ...state.filter, ...action.payload },
            };
        }
        if (action.type === 'setView') {
            return {
                ...state,
                view: action.payload,
            };
        }
        assertNever(action);
    }, {
        filter: {
            isFavorite: false,
            name: '',
            type: '',
        },
        view: 'grid',
    }, (state) => {
        const newState = {
            ...state,
        };
        return {
            ...newState,
        };
    });
    const setFilter = useCallback((filter: Partial<AppContextData['filter']>) => {
        dispatch({ payload: filter, type: 'setFilter' });
    }, []);
    const setView = useCallback((view: AppContextData['view']) => {
        dispatch({ payload: view, type: 'setView' });
    }, []);
    return (
        <AppContext.Provider value={{ filter, setFilter, setView, view }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextData => {
    return useContext(AppContext);
};
