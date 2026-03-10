self.addEventListener("install", e => {
e.waitUntil(
caches.open("vital-cache").then(cache=>{
return cache.addAll([
"/VITAL/",
"/VITAL/index.html",
"/VITAL/manifest.json"
])self.addEventListener("install", event => {
event.waitUntil(
caches.open("vital-cache").then(cache => {
return cache.addAll([
"./",
"./index.html",
"./manifest.json"
]);
})
);
});

self.addEventListener("fetch", event => {
event.respondWith(
caches.match(event.request).then(response => {
return response || fetch(event.request);
})
);
});

})self.addEventListener('install', e => {
e.waitUntil(
caches.open('vital-cache').then(cache => {
return cache.addAll([
'/',
'/index.html'
])
})
)
})

self.addEventListener('fetch', e => {
e.respondWith(
caches.match(e.request).then(response => {
return response || fetch(e.request)
})
)
})

)
})

self.addEventListener("fetch", e=>{
e.respondWith(
caches.match(e.request).then(response=>{
return response || fetch(e.request)
})
)
})
