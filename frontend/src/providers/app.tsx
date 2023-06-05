import { ApiProvider } from 'src/providers/api';
import { AppContextProvider } from 'src/providers/appContext';
import { SnackbarProvider } from 'notistack';
import { PokemonRecognizerProvider } from 'src/providers/pokemonRecognizer';

import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {
    return (
        <SnackbarProvider
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'top',
            }}
            maxSnack={3}
            preventDuplicate
        >
            <ApiProvider>
                <AppContextProvider>
                    <PokemonRecognizerProvider>
                        {children}
                    </PokemonRecognizerProvider>
                </AppContextProvider>
            </ApiProvider>
        </SnackbarProvider>
    );
};
