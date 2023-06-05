export function assertNotNull<T>(value: T): asserts value is (T extends null ? never : T) {
    if (value === null) {
        throw new TypeError('Value should be not null');
    }
}
export const isMobile = () => {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
};
