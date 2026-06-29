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

const getStock = ()=>[
    ...collection("estoque")
];

const getStockByLure = id=>

    getStock()

        .filter(item=>

            item.isca.toLowerCase()===

            String(id)

            .toLowerCase()

        );

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

const Database = {

    async load(){

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

        await Promise.all(

            manifest.files.map(

                async file=>{

                    try{

                        const json =

                            await readJson(

                                file

                            );

                        data.set(

                            normalizeName(file),

                            json

                        );

                    }

                    catch(error){

                        registerLoadError(

                            error,

                            file

                        );

                    }

                }

            )

        );

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

getStock,



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