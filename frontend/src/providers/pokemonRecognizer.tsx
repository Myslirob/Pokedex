import { createContext, useContext, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const PokemonRecognizerContext = createContext<tf.GraphModel | null>(null);

export const PokemonRecognizerProvider = ({ children }: Props) => {
    const [model, setModel] = useState<tf.GraphModel | null>(null);

    useEffect(() => {
        (async () => {
            const data = await tf.loadGraphModel('/tfjs_model/model.json');
            setModel(data);
        })();
    }, []);

    return (
        <PokemonRecognizerContext.Provider value={model}>
            {children}
        </PokemonRecognizerContext.Provider>
    );
};

export const usePokemonRecognizerContext = () => {
    return useContext(PokemonRecognizerContext);
};
