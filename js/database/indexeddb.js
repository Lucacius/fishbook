/*
=========================================================
FishBook
IndexedDB
=========================================================
*/

(() => {

"use strict";

const DB_NAME = "FishBookDB";

const DB_VERSION = 5.0;

const STORES = [

    "iscas",

    "cores",

    "estoque",

    "categorias",

    "especies",

    "configuracoes",

    "caixas"


];

let db = null;

/*=========================================================
Abrir banco
=========================================================*/

const open = () => {

    if (db) {

        return Promise.resolve(db);

    }

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(

            DB_NAME,

            DB_VERSION

        );

        request.onerror = () =>

            reject(request.error);

        request.onupgradeneeded = () => {

            const database = request.result;

            STORES.forEach(name => {

                if (

                    !database.objectStoreNames.contains(name)

                ) {

                    database.createObjectStore(

                        name,

                        {

                            keyPath: "id"

                        }

                    );

                }

            });

        };

        request.onsuccess = () => {

            db = request.result;

            resolve(db);

        };

    });

};

/*=========================================================
Store
=========================================================*/

const store = (

    name,

    mode = "readonly"

) => {

    return db

        .transaction(

            name,

            mode

        )

        .objectStore(name);

};

/*=========================================================
Get
=========================================================*/

const get = async (

    name,

    id

) => {

    await open();

    return new Promise((resolve, reject) => {

        const request =

            store(name).get(id);

        request.onsuccess = () =>

            resolve(request.result);

        request.onerror = () =>

            reject(request.error);

    });

};

/*=========================================================
Get All
=========================================================*/

const getAll = async name => {

    await open();

    return new Promise((resolve, reject) => {

        const request =

            store(name).getAll();

        request.onsuccess = () =>

            resolve(request.result);

        request.onerror = () =>

            reject(request.error);

    });

};

/*=========================================================
Put
=========================================================*/

const put = async (

    name,

    value

) => {

    await open();

    return new Promise((resolve, reject) => {

        const request =

            store(

                name,

                "readwrite"

            )

            .put(value);

        request.onsuccess = () =>

            resolve(value);

        request.onerror = () =>

            reject(request.error);

    });

};

/*=========================================================
Delete
=========================================================*/

const remove = async (

    name,

    id

) => {

    await open();

    return new Promise((resolve, reject) => {

        const request =

            store(

                name,

                "readwrite"

            )

            .delete(id);

        request.onsuccess = () =>

            resolve(true);

        request.onerror = () =>

            reject(request.error);

    });

};

/*=========================================================
Clear
=========================================================*/

const clear = async name => {

    await open();

    return new Promise((resolve, reject) => {

        const request =

            store(

                name,

                "readwrite"

            )

            .clear();

        request.onsuccess = () =>

            resolve(true);

        request.onerror = () =>

            reject(request.error);

    });

};

/*=========================================================
Count
=========================================================*/

const count = async name => {

    await open();

    return new Promise((resolve, reject) => {

        const request =

            store(name).count();

        request.onsuccess = () =>

            resolve(request.result);

        request.onerror = () =>

            reject(request.error);

    });

};

/*=========================================================
API
=========================================================*/

window.FishBook =

    window.FishBook ?? {};

window.FishBook.Database =

    window.FishBook.Database ?? {};

window.FishBook.Database.IDB =

    Object.freeze({

        open,

        store,

        get,

        getAll,

        put,

        delete: remove,

        clear,

        count,

        stores: STORES

    });

})();