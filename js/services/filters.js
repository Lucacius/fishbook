(() => {

"use strict";

const unique = values =>

    [...new Set(values)]
        .filter(Boolean)
        .sort();

const getSpecies = () => {

    const grupos = {};

    window.Database
        .get("especies")
        .forEach(especie => {

            const categoria =
                especie.categoria ??
                "Outros";

            grupos[categoria] ??= [];

            grupos[categoria].push(
                especie.nome
            );

        });

    return [



        ...Object.keys(grupos)

            .sort()

            .map(categoria => ({

                title: categoria,

                options: grupos[categoria]

                    .sort()

            }))

    ];

};
const getStructures = () =>

    unique(

        window.Database
            .getLures()
            .flatMap(

                lure =>

                    lure.estruturas ?? []

            )

    );

const getWorks = () =>

    unique(

        window.Database
            .getLures()
            .flatMap(

                lure =>

                    lure.trabalhos ?? []

            )

    );

const getAssemblies = () =>

    unique(

        window.Database
            .getLures()
            .flatMap(

                lure =>

                    lure.montagens ?? []

            )

    );

const getWeights = () => [

    "Até 4 g",

    "5 a 8 g",

    "9 a 12 g",

    "13 a 16 g",

    "17 a 25 g",

    "Acima de 25 g"

];

const getFlotation = () =>

    unique(

        window.Database
            .getLures()
            .map(

                lure =>

                    lure.flutuacao

            )

    );

const getWater = () => [

    "Limpa",

    "Turva Leve",

    "Turva"

];

const getTime = () => [

    "Amanhecer",

    "Manhã",

    "Tarde",

    "Noite"

];

const getPlaces = () => [

    "Represa",

    "Rio",

    "Lago",

    "Lagoa",

    "Pesqueiro",

    "Córrego"

];

const getDepth = () => [

    "Superfície",

    "Meia Água",

    "Fundo"

];

const getLureType = () => [

    "Artificial",

    "Natural"

];

const getPriority = () => [

    "Não importa",

    "Alta eficiência",

    "Equilibrada",

    "Quero testar algo diferente"

];

window.FishBook =
    window.FishBook ?? {};

window.FishBook.Services =
    window.FishBook.Services ?? {};

window.FishBook.Services.Filters = {

    getSpecies,

    getStructures,

    getWorks,

    getAssemblies,

    getWeights,

    getFlotation,

    getWater,

    getTime,

    getPlaces,

    getDepth,

    getLureType,

    getPriority

};

})();