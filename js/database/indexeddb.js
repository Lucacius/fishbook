/*
=========================================================
FishBook
IndexedDB
=========================================================
*/

(() => {

"use strict";

const DB_NAME = "FishBookDB";

const DB_VERSION = 1;

const STORES = [

    "iscas",

    "estoque",

    "categorias",

    "especies",

    "configuracoes"

];

let db = null;

/*=========================================================
Abrir banco
=========================================================*/

const open = ()=>{

    return new Promise(

        (resolve,reject)=>{

            const request =

                indexedDB.open(

                    DB_NAME,

                    DB_VERSION

                );

            request.onerror=()=>

                reject(

                    request.error

                );

            request.onupgradeneeded=()=>{

                const database =

                    request.result;

                STORES.forEach(store=>{

                    if(

                        !database.objectStoreNames.contains(

                            store

                        )

                    ){

                        database.createObjectStore(

                            store,

                            {

                                keyPath:"id"

                            }

                        );

                    }

                });

            };

            request.onsuccess=()=>{

                db=request.result;

                resolve(db);

            };

        }

    );

};

/*=========================================================
Store
=========================================================*/

const store = (

    name,

    mode="readonly"

)=>{

    return db

        .transaction(

            name,

            mode

        )

        .objectStore(

            name

        );

};

/*=========================================================
API
=========================================================*/

window.FishBook=

    window.FishBook ?? {};

window.FishBook.Database=

    window.FishBook.Database ?? {};

window.FishBook.Database.IDB=

    Object.freeze({

        open,

        store,

        stores:STORES

    });

})();