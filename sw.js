const CACHE_NAME =
  "la-parada-javi-v3";

const BASE =
  self.registration.scope;


// =============================================
// ARCHIVOS DEL PROYECTO
// =============================================

const APP_SHELL = [

  new URL(
    "./",
    BASE
  ).href,

  new URL(
    "index.html",
    BASE
  ).href,

  new URL(
    "pedidos.html",
    BASE
  ).href,

  new URL(
    "pages/about.html",
    BASE
  ).href,

  new URL(
    "pages/contact.html",
    BASE
  ).href,

  new URL(
    "css/styles.css",
    BASE
  ).href,

  new URL(
    "css/materialize.min.css",
    BASE
  ).href,

  new URL(
    "js/firebase.js",
    BASE
  ).href,

  new URL(
    "js/db.js",
    BASE
  ).href,

  new URL(
    "js/index.js",
    BASE
  ).href,

  new URL(
    "js/pedidos.js",
    BASE
  ).href,

  new URL(
    "js/materialize.min.js",
    BASE
  ).href,

  new URL(
    "manifest.json",
    BASE
  ).href,

  new URL(
    "images/icon-192.png",
    BASE
  ).href,

  new URL(
    "images/icon-512.png",
    BASE
  ).href,

  new URL(
    "images/icon-maskable-512.png",
    BASE
  ).href

];


// =============================================
// INSTALAR
// =============================================

self.addEventListener(
  "install",
  function (event) {

    event.waitUntil(

      caches
        .open(
          CACHE_NAME
        )

        .then(
          function (cache) {

            return cache.addAll(
              APP_SHELL
            );

          }
        )

    );

    self.skipWaiting();

  }

);


// =============================================
// ACTIVAR
// =============================================

self.addEventListener(
  "activate",
  function (event) {

    event.waitUntil(

      caches
        .keys()

        .then(
          function (cacheNames) {

            return Promise.all(

              cacheNames.map(
                function (cacheName) {

                  if (
                    cacheName !==
                    CACHE_NAME
                  ) {

                    return caches.delete(
                      cacheName
                    );

                  }

                }
              )

            );

          }
        )

    );

    self.clients.claim();

  }

);


// =============================================
// FETCH
// =============================================

self.addEventListener(
  "fetch",
  function (event) {

    if (
      event.request.method !==
      "GET"
    ) {

      return;

    }

    event.respondWith(

      caches
        .match(
          event.request
        )

        .then(
          function (respuestaCache) {

            if (
              respuestaCache
            ) {

              return respuestaCache;

            }

            return fetch(
              event.request
            );

          }
        )

    );

  }

);