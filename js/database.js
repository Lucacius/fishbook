/*
=========================================================
FishBook
Database
=========================================================
*/

(() => {

"use strict";

const DATABASE_PATH =
    "database/";

const MANIFEST_FILE =
    "manifest.json";

const data =
    new Map();

const loadErrors =
    [];

let loaded =
    false;

/*=========================================================
Utilidades
=========================================================*/

const normalizeName = name =>

    String(name ?? "")

        .trim()

        .replace(/\.json$/i,"");

const createError = (

    type,

    file,

    message,

    cause = null

)=>({

    type,

    file,

    message,

    cause

});

const readJson = async file=>{

    let response;

    try{

        response =
            await fetch(

                `${DATABASE_PATH}${file}`,

                {

                    cache:"no-store"

                }

            );

    }

    catch(error){

        throw createError(

            "read",

            file,

            `Não foi possível acessar "${file}".`,

            error

        );

    }

    if(!response.ok){

        throw createError(

            "missing",

            file,

            `O arquivo "${file}" não foi encontrado (HTTP ${response.status}).`

        );

    }

    const content =
        await response.text();

    try{

        return JSON.parse(content);

    }

    catch(error){

        throw createError(

            "invalid-json",

            file,

            `O arquivo "${file}" contém JSON inválido.`,

            error

        );

    }

};

const registerLoadError = (

    error,

    fallbackFile

)=>{

    const normalized =

        error &&

        typeof error==="object" &&

        "type" in error

            ? error

            : createError(

                "read",

                fallbackFile,

                `Falha inesperada ao carregar "${fallbackFile}".`,

                error

            );

    loadErrors.push(

        normalized

    );

};

/*=========================================================
Coleções
=========================================================*/

const collection = name=>{

    const dataset =
        data.get(

            normalizeName(name)

        );

    if(!dataset){

        return [];

    }

    return dataset[name] ?? [];

};

/*=========================================================
Consultas
=========================================================*/

const getLures = ()=>[
    ...collection("iscas")
];

const getLure = id=>

    getLures().find(item=>

        item.id.toLowerCase()===

        String(id)

        .toLowerCase()

    ) ?? null;

const getCategories = ()=>[
    ...collection("categorias")
];

const getBoxes = ()=>[
    ...collection("caixas")
];

const getStock = ()=>[
    ...collection("estoque")
];

const addStock = async registro => {

    const estoque =
        collection("estoque");

    const index =
        estoque.findIndex(

            item =>

                item.id === registro.id

        );

    if (

        index >= 0

    ) {

        estoque[index] =
            registro;

    }

    else {

        estoque.push(

            registro

        );

    }

    await window.FishBook
        .Database
        .IDB
        .put(

            "estoque",

            registro

        );

    return registro;

};

const removeStock = async id => {

    const estoque = collection("estoque");

    const index = estoque.findIndex(

        item => item.id === id

    );

    if (index === -1) {

        return false;

    }

    estoque.splice(index, 1);

    await window.FishBook.Database.IDB.delete(

        "estoque",

        id

    );

    return true;

};

const nextStockId = () => {

    const estoque = getStock();

    if (!estoque.length) {

        return "est-0001";

    }

    const maior = Math.max(

        ...estoque.map(item =>

            Number(

                item.id.replace("est-", "")

            )

        )

    );

    return `est-${String(maior + 1).padStart(4, "0")}`;

};

const getSpecies = ()=>[
    ...collection("especies")
];


const searchLures = text=>{

    const search =

        String(text ?? "")

            .trim()

            .toLowerCase();

    if(!search){

        return getLures();

    }

    return getLures()

        .filter(item=>

            item.nome

                .toLowerCase()

                .includes(search)

            ||

            item.id

                .toLowerCase()

                .includes(search)

        );

};

const getLuresByCategory = category=>{

    if(!category){

        return getLures();

    }

    return getLures()

        .filter(item=>

            item.categoria===

            category

        );

};

const getOrigins = () =>

    [...new Set(

        getLures()

            .map(lure => lure.origem)

            .filter(Boolean)

    )]

    .sort();

const getCategoriesList = () =>

    [...new Set(

        getLures()

            .map(lure => lure.categoria)

            .filter(Boolean)

    )]

    .sort();

const getSubcategories = () =>

    [...new Set(

        getLures()

            .map(lure => lure.subcategoria)

            .filter(Boolean)

    )]

    .sort();

const getMontagens = () =>

    [...new Set(

        getLures()

            .flatMap(

                lure => lure.montagens ?? []

            )

    )]

    .sort();

/*=========================================================
API
=========================================================*/

const syncStore = async name => {

    const idb =

        window.FishBook.Database.IDB;

    const registros =

        await idb.getAll(name);

    if (registros.length) {

        data.set(

            name,

            {

                [name]: registros

            }

        );

        return;

    }

    const json =

        await readJson(`${name}.json`);

    data.set(

        name,

        json

    );

    const lista =

        json[name] ?? [];

    for (const item of lista) {

        await idb.put(

            name,

            item

        );

    }

};

const Database = {

    async load(){

        await window.FishBook.Database.IDB.open();

        data.clear();

        loadErrors.length=0;

        loaded=false;

        let manifest;

        try{

            manifest =
                await readJson(

                    MANIFEST_FILE

                );

            data.set(

                "manifest",

                manifest

            );

        }

        catch(error){

            registerLoadError(

                error,

                MANIFEST_FILE

            );

            return this.status();

        }

        if(

            !manifest ||

            !Array.isArray(

                manifest.files

            )

        ){

            registerLoadError(

                createError(

                    "invalid-manifest",

                    MANIFEST_FILE,

                    'O manifesto deve possuir "files".'

                ),

                MANIFEST_FILE

            );

            return this.status();

        }

for (const file of manifest.files) {

    try {

        await syncStore(

            normalizeName(file)

        );

    }

    catch (error) {

        registerLoadError(

            error,

            file

        );

    }

}

        loaded=true;

        return this.status();

    },

    get(name){

        return data.get(

            normalizeName(name)

        );

    },

collection,

getLures,

getLure,

getCategories,

getOrigins,

getCategoriesList,

getSubcategories,

getMontagens,

getBoxes,

getStock,

addStock,

removeStock,

nextStockId,



    /* Compatibilidade */

    iscas(){

        return getLures();

    },

    categorias(){

        return getCategories();

    },

    estoque(){

        return getStock();

    },

    especies(){

        return getSpecies();

    },

    entries(){

        return [

            ...data.entries()

        ].filter(

            ([name])=>

                name!=="manifest"

        );

    },

    errors(){

        return [

            ...loadErrors

        ];

    },

    status(){

        return Object.freeze({

            loaded,

            filesLoaded:

                this.entries().length,

            errors:

                loadErrors.length

        });

    }

};

window.Database =
    Object.freeze(Database);

})();