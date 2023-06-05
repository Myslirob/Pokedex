const withPWA = require('next-pwa')({
    dest: 'public',
    runtimeCaching: [
        {
            handler: 'CacheFirst',
            options: {
                cacheName: 'static-js-assets',
                expiration: {
                    maxAgeSeconds: 24 * 60 * 60,
                    maxEntries: 32, // 24 hours
                },
            },
            urlPattern: /\.(?:js)$/i,
        },
        {
            handler: 'CacheFirst',
            options: {
                cacheName: 'static-json-assets',
                expiration: {
                    maxAgeSeconds: 24 * 60 * 60,
                    maxEntries: 32, // 24 hours
                },
            },
            urlPattern: /\.(?:json)$/i,
        },
        {
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'next-image',
                expiration: {
                    maxAgeSeconds: 24 * 60 * 60,
                    maxEntries: 64, // 24 hours
                },
            },
            urlPattern: /\/_next\/image\?url=.+$/i,
        },
    ],
});

module.exports = withPWA({
    // reactStrictMode: true,
});
