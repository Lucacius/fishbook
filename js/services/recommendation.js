/*
=========================================================
FishBook
Recommendation Service
Parte 1/4
=========================================================
*/

(() => {

"use strict";

/*=========================================================
Constantes
=========================================================*/

const SCORE = Object.freeze({

    SPECIES: 50,

    WATER: 15,

    TIME: 10,

    STRUCTURE: 10,

    DEPTH: 8,

    WORK: 8,

    WEIGHT: 5,

    FLOAT: 5,

    ASSEMBLY: 5,

    TYPE: 100,

    PLACE: 10

});

/*=========================================================
Helpers
=========================================================*/

const normalize = value =>

    String(

        value ?? ""

    )

    .normalize("NFD")

    .replace(/[\u0300-\u036f]/g,"")

    .toLowerCase()

    .trim();

const hasFilter = filters =>

    Boolean(

        filters.especie ||

        filters.local ||

        filters.horario ||

        filters.agua ||

        filters.profundidade ||

        filters.tipo ||

        filters.montagem ||

        filters.peso ||

        filters.flutuacao ||

        filters.prioridade ||

        filters.estrutura.length ||

        filters.trabalho.length

    );

const contains = (

    list,

    value

)=>

    (list ?? [])

        .map(normalize)

        .includes(

            normalize(

                value

            )

        );

/*=========================================================
Pontuação
=========================================================*/

const scoreSpecies = (

    lure,

    filters

)=>{

    if(

        !filters.especie ||

        filters.especie==="Todas"

    ){

        return 0;

    }

    const especie =

        (lure.especies ?? [])

        .find(item=>

            normalize(

                item.nome

            )===

            normalize(

                filters.especie

            )

        );

    if(

        !especie

    ){

        return -9999;

    }

    return (

        especie.afinidade ??

        0

    ) * 10;

};

const scoreTime = (

    lure,

    filters

)=>{

    if(

        !filters.horario

    ){

        return 0;

    }

    const horario = {

        amanhecer:"amanhecer",

        "manhã":"manha",

        manha:"manha",

        tarde:"tarde",

        noite:"noite"

    };

    const key =

        horario[

            normalize(

                filters.horario

            )

        ];

    if(

        !key

    ){

        return 0;

    }

    return (

        lure.horario?.[key] ??

        0

    ) * 2;

};

const scoreWater = (

    lure,

    filters

)=>{

    if(

        !filters.agua

    ){

        return 0;

    }

    const agua = {

        limpa:"limpa",

        "turva leve":"turvaLeve",

        turva:"turva"

    };

    const key =

        agua[

            normalize(

                filters.agua

            )

        ];

    if(

        !key

    ){

        return 0;

    }

    return (

        lure.agua?.[key] ??

        0

    ) * 3;

};

const scoreDepth = (

    lure,

    filters

)=>{

    if(

        !filters.profundidade

    ){

        return 0;

    }

    const descricao =

        normalize(

            lure.profundidade?.descricao

        );

    if(

        !descricao

    ){

        return 0;

    }

    if(

        descricao===

        normalize(

            filters.profundidade

        )

    ){

        return SCORE.DEPTH;

    }

    return 0;

};

const scoreAssembly = (

    lure,

    filters

)=>{

    if(

        !filters.montagem

    ){

        return 0;

    }

    if(

        contains(

            lure.montagens,

            filters.montagem

        )

    ){

        return SCORE.ASSEMBLY;

    }

    return -9999;

};

const scoreType = (

    lure,

    filters

)=>{

    if(

        !filters.tipo

    ){

        return 0;

    }

    if(

        normalize(

            lure.origem

        )===

        normalize(

            filters.tipo

        )

    ){

        return SCORE.TYPE;

    }

    return -9999;

};

const scoreWeight = (

    lure,

    filters

)=>{

    if(

        !filters.peso

    ){

        return 0;

    }

    if(

        !lure.peso

    ){

        return 0;

    }

    if(

        normalize(

            lure.peso

        )===

        normalize(

            filters.peso

        )

    ){

        return SCORE.WEIGHT;

    }

    return 0;

};

const scoreFloat = (

    lure,

    filters

)=>{

    if(

        !filters.flutuacao

    ){

        return 0;

    }

    if(

        normalize(

            lure.flutuacao

        )===

        normalize(

            filters.flutuacao

        )

    ){

        return SCORE.FLOAT;

    }

    return 0;

};

const scoreStructure = (

    lure,

    filters

)=>{

    if(

        !filters.estrutura.length

    ){

        return 0;

    }

    let score = 0;

    filters.estrutura.forEach(

        item=>{

            if(

                contains(

                    lure.estruturas,

                    item

                )

            ){

                score +=

                    SCORE.STRUCTURE;

            }

        }

    );

    return score;

};

const scoreWork = (

    lure,

    filters

)=>{

    if(

        !filters.trabalho.length

    ){

        return 0;

    }

    let score = 0;

    filters.trabalho.forEach(

        item=>{

            if(

                contains(

                    lure.trabalhos,

                    item

                )

            ){

                score +=

                    SCORE.WORK;

            }

        }

    );

    return score;

};

const scorePlace = (

    lure,

    filters

)=>{

    if(

        !filters.local

    ){

        return 0;

    }

    if(

        contains(

            lure.aquiferos,

            filters.local

        )

    ){

        return SCORE.PLACE;

    }

    return 0;

};

/*=========================================================
Calcula Pontuação
=========================================================*/

const calculateScore = (

    lure,

    filters

)=>{

    let score = 0;

    score +=

        scoreSpecies(

            lure,

            filters

        );

    score +=

        scoreTime(

            lure,

            filters

        );

    score +=

        scoreWater(

            lure,

            filters

        );

    score +=

        scoreDepth(

            lure,

            filters

        );

    score +=

        scoreAssembly(

            lure,

            filters

        );

    score +=

        scoreType(

            lure,

            filters

        );

    score +=

        scoreWeight(

            lure,

            filters

        );

    score +=

        scoreFloat(

            lure,

            filters

        );

    score +=

        scoreStructure(

            lure,

            filters

        );

    score +=

        scoreWork(

            lure,

            filters

        );

    score +=

        scorePlace(

            lure,

            filters

        );

    return score;

};

/*=========================================================
Pesquisa
=========================================================*/

const search = filters => {

    if (

        !hasFilter(

            filters

        )

    ) {

        return [];

    }

    const results =

        window.Database

            .get(

                "iscas"

            )

            .map(

                lure => ({

                    ...lure,

                    score:

                        calculateScore(

                            lure,

                            filters

                        )

                })

            )

            .filter(

                lure =>

                    lure.score >= 0

            )

            .sort(

                (a,b)=>

                    b.score -

                    a.score

            );

    return results;

};

/*=========================================================
Serviço
=========================================================*/

window.FishBook =
    window.FishBook ?? {};

window.FishBook.Services =
    window.FishBook.Services ?? {};

window.FishBook.Services.Recommendation =

    Object.freeze({

        search

    });

})();