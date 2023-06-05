import { useEffect } from 'react';

export const useDisableScroll = (scrollable: boolean) => {
    useEffect(() => {
        const root = document.getElementById('root');
        if (root === null) return;
        if (scrollable) {
            document.body.style.overflow = 'auto';
            root.style.overflowY = 'auto';
            return;
        }
        root.style.overflowY = 'scroll';
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
            root.style.overflowY = 'auto';
        };
    }, [scrollable]);
};
