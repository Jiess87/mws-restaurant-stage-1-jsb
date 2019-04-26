self.addEventListener('install', function(event) {
    var toCache = [
        'index.html',
        'restaurant.html', 
        'css/styles.css',
        'js/main.js',
        'js/restaurant_info.js',
        'data/restaurants.json'
    ];

    caches.has('mws-cache').then(function(cacheCheck) {
        if (!cacheCheck) {
            event.waitUntil(
                caches.open('mws-cache').then(function(cache) {
                    return cache.addAll(toCache);
                })
            );
        } else return
    });
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
           if (response) return response;
           return fetch(event.request);
        })
    );
});