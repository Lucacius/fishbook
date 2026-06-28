/*
=========================================================
FishBook
Service Worker
=========================================================
*/

"use strict";

const CACHE_NAME = "fishbook-v1";

const FILES = [

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

    "./assets/icons/favicon.ico",
    "./assets/icons/apple-touch-icon.png",
    "./assets/icons/icon-192.png",
    "./assets/icons/icon-512.png"

];

self.addEventListener(

    "install",

    event=>{

        event.waitUntil(

            caches.open(

                CACHE_NAME

            )

            .then(cache=>{

                return cache.addAll(

                    FILES

                );

            })

        );

        self.skipWaiting();

    }

);

self.addEventListener(

    "activate",

    event=>{

        event.waitUntil(

            caches.keys()

            .then(keys=>{

                return Promise.all(

                    keys.map(key=>{

                        if(

                            key!==CACHE_NAME

                        ){

                            return caches.delete(

                                key

                            );

                        }

                    })

                );

            })

        );

        self.clients.claim();

    }

);

self.addEventListener(

    "fetch",

    event=>{

        event.respondWith(

            caches.match(

                event.request

            )

            .then(response=>{

                return (

                    response ||

                    fetch(

                        event.request

                    )

                );

            })

        );

    }

);