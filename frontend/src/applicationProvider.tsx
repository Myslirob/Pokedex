import { ApiProvider } from 'src/api/provider';
import { AppContextProvider } from 'src/appContext';

import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};
export const ApplicationProvider = ({ children }: Props) => {
    return (
        <ApiProvider>
            <AppContextProvider>
                {children}
            </AppContextProvider>
        </ApiProvider>
    );
};
