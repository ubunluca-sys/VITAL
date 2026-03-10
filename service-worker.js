self.addEventListener("install", e => {
e.waitUntil(
caches.open("vital-cache").then(cache=>{
return cache.addAll([
"/VITAL/",
"/VITAL/index.html",
"/VITAL/manifest.json"
])
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
