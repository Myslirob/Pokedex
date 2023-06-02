import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { assertNotNull } from 'src/helper';

import type { MutableRefObject } from 'react';

export const useMaximalize = ({ ref }: { ref: MutableRefObject<any> }) => {
    const [ modal, setModal ] = useState<{ x: number; y: number } | undefined>(undefined);
    const coordination = useDebounce(modal, 1000);
    useEffect(() => {
        const root = document.getElementById('root');
        assertNotNull(root);
        if (coordination === undefined && modal === undefined) {
            document.body.style.overflow = 'auto';
            // @ts-expect-error
            root.style['overflow-y'] = 'auto';
            return;
        }
        // @ts-expect-error
        root.style['overflow-y'] = 'scroll';
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
            // @ts-expect-error
            root.style['overflow-y'] = 'auto';
        };
    }, [coordination, modal]);

    const maximalize = () => {
        if (ref.current !== null) {
            const { y, x } = ref.current.getBoundingClientRect();
            setModal({ x, y });
        }
    };
    const minimalize = () => {
        setModal(undefined);
    };
    return {
        coordination: modal ?? coordination,
        isHiding: modal === undefined,
        maximalize,
        minimalize,
    };
};
