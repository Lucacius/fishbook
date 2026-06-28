/*
=========================================================
FishBook
Service Worker
Versão 1.0
=========================================================
*/

"use strict";

const CACHE_NAME = "fishbook-v1.0.0";

const APP_FILES = [

    "./",
    "./index.html",
    "./manifest.webmanifest",

    "./css/reset.css",
    "./css/theme.css",
    "./css/layout.css",
    "./css/utilities.css",
    "./css/components.css",
    "./css/dashboard.css",
    "./css/catalogo.css",
    "./css/ficha.css",
    "./css/escolher.css",
    "./css/responsive.css",

    "./js/app.js",
    "./js/database.js",
    "./js/router.js",
    "./js/utils.js",
    "./js/validator.js",

    "./js/config/constantes.js",
    "./js/config/pesos.js",
    "./js/config/dicionario.js",
    "./js/config/filtros.js",

    "./js/components/index.js",
    "./js/components/button.js",
    "./js/components/card.js",
    "./js/components/badge.js",
    "./js/components/chip.js",
    "./js/components/section.js",
    "./js/components/filter-group.js",
    "./js/components/suggestion-card.js",
    "./js/components/lure-card.js",

    "./js/services/index.js",
    "./js/services/catalogo.service.js",
    "./js/services/escolher.service.js",

    "./js/pages/home.js",
    "./js/pages/catalogo.js",
    "./js/pages/ficha.js",
    "./js/pages/escolher.js",

    "./database/manifest.json",
    "./database/iscas.json",
    "./database/estoque.json",
    "./database/categorias.json",
    "./database/especies.json",

    "./assets/icons/favicon.ico",
    "./assets/icons/apple-touch-icon.png",
    "./assets/icons/icon-192.png",
    "./assets/icons/icon-512.png"
];

/*=========================================================
INSTALL
=========================================================*/

self.addEventListener("install", event=>{

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache=>cache.addAll(APP_FILES))

    );

});

/*=========================================================
ACTIVATE
=========================================================*/

self.addEventListener("activate",event=>{

    event.waitUntil(

        caches.keys()

        .then(keys=>

            Promise.all(

                keys.map(key=>{

                    if(key!==CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            )

        )

    );

    self.clients.claim();

});

/*=========================================================
FETCH
=========================================================*/

self.addEventListener("fetch",event=>{

    if(event.request.method!=="GET"){

        return;

    }

    event.respondWith(

        caches.match(event.request)

        .then(cache=>{

            if(cache){

                return cache;

            }

            return fetch(event.request)

            .then(response=>{

                if(

                    !response ||

                    response.status!==200 ||

                    response.type!=="basic"

                ){

                    return response;

                }

                const clone=

                    response.clone();

                caches.open(CACHE_NAME)

                .then(cache=>{

                    cache.put(

                        event.request,

                        clone

                    );

                });

                return response;

            });

        })

    );

});
