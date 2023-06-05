import { useEffect } from 'react';
import { assertNotNull } from 'src/helper';

export const useDisableScroll = (scrollable: boolean) => {
    useEffect(() => {
        const root = document.getElementById('root');
        assertNotNull(root);
        if (scrollable) {
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
    }, [scrollable]);
};
