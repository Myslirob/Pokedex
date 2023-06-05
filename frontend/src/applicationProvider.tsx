import { ApiProvider } from 'src/api/provider';
import { AppContextProvider } from 'src/appContext';
import { SnackbarProvider } from 'notistack';
import { PokemonRecognizerProvider } from 'src/pokemonRecognizer/provider';

import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export const ApplicationProvider = ({ children }: Props) => {
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
