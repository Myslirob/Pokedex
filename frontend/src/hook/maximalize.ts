import { useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { useDisableScroll } from 'src/hook/disableScroll';

import type { MutableRefObject } from 'react';

export const useMaximalize = ({ ref }: { ref: MutableRefObject<any> }) => {
    const [ modal, setModal ] = useState<{ x: number; y: number } | undefined>(undefined);
    const coordination = useDebounce(modal, 1000);
    useDisableScroll(coordination === undefined && modal === undefined);
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
