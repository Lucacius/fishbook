/*
=========================================================
FishBook
Service Worker
Versão 2.0
=========================================================
*/

"use strict";

/*=========================================================
VERSÃO DO CACHE
=========================================================*/

const CACHE_NAME = "fishbook-v2.0.0";

/*=========================================================
ARQUIVOS DA APLICAÇÃO
=========================================================*/

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
ARQUIVOS SEMPRE ATUALIZADOS PELA INTERNET
=========================================================*/

const NETWORK_FIRST = [

    "/database/manifest.json",
    "/database/iscas.json",
    "/database/estoque.json",
    "/database/categorias.json",
    "/database/especies.json"

];

/*=========================================================
UTILIDADES
=========================================================*/

const isNetworkFirst = request => {

    const url = new URL(request.url);

    return NETWORK_FIRST.some(path =>

        url.pathname.endsWith(path)

    );

};

/*=========================================================
INSTALL
=========================================================*/

self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(

        caches

            .open(CACHE_NAME)

            .then(cache =>

                cache.addAll(APP_FILES)

            )

    );

});

/*=========================================================
ACTIVATE
=========================================================*/

self.addEventListener("activate", event => {

    event.waitUntil(

        (async () => {

            const keys =
                await caches.keys();

            await Promise.all(

                keys

                    .filter(key =>

                        key !== CACHE_NAME

                    )

                    .map(key =>

                        caches.delete(key)

                    )

            );

            await self.clients.claim();

        })()

    );

});

/*=========================================================
ATUALIZAÇÃO IMEDIATA
=========================================================*/

self.addEventListener("message", event => {

    if (

        event.data === "SKIP_WAITING"

    ) {

        self.skipWaiting();

    }

});

/*=========================================================
FETCH
=========================================================*/

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") {

        return;

    }

    if (isNetworkFirst(event.request)) {

        event.respondWith(

            (async () => {

                try {

                    const response =

                        await fetch(event.request);

                    const cache =

                        await caches.open(CACHE_NAME);

                    cache.put(

                        event.request,

                        response.clone()

                    );

                    return response;

                }

                catch (error) {

                    const cached =

                        await caches.match(event.request);

                    if (cached) {

                        return cached;

                    }

                    throw error;

                }

            })()

        );

        return;

    }

    event.respondWith(

        (async () => {

            const cached =

                await caches.match(event.request);

            if (cached) {

                fetch(event.request)

                    .then(async response => {

                        if (

                            response.ok &&

                            (

                                response.type === "basic" ||

                                response.type === "cors"

                            )

                        ) {

                            const cache =

                                await caches.open(CACHE_NAME);

                            cache.put(

                                event.request,

                                response.clone()

                            );

                        }

                    })

                    .catch(() => {});

                return cached;

            }

            try {

                const response =

                    await fetch(event.request);

                if (

                    response.ok &&

                    (

                        response.type === "basic" ||

                        response.type === "cors"

                    )

                ) {

                    const cache =

                        await caches.open(CACHE_NAME);

                    cache.put(

                        event.request,

                        response.clone()

                    );

                }

                return response;

            }

            catch (error) {

                if (

                    event.request.mode === "navigate"

                ) {

                    return caches.match("./index.html");

                }

                throw error;

            }

        })()

    );

});