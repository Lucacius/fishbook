/*
=========================================================
FishBook
Recommendation Service
=========================================================
*/

(() => {

"use strict";

/*=========================================================
Constantes
=========================================================*/

const SCORE = Object.freeze({

    SPECIES:50,

    WATER:15,

    TIME:10,

    PLACE:10,

    STRUCTURE:8,

    WORK:8,

    DEPTH:6,

    ASSEMBLY:6,

    FLOAT:5,

    WEIGHT:5,

    TYPE:100

});

/*=========================================================
Helpers
=========================================================*/

const normalize = value=>

    String(

        value ?? ""

    )

    .normalize("NFD")

    .replace(

        /[\u0300-\u036f]/g,

        ""

    )

    .toLowerCase()

    .trim();

const hasFilter = filters=>

    Object.values(

        filters

    ).some(

        value=>

            Array.isArray(

                value

            )

                ? value.length>0

                : Boolean(

                    value

                )

    );

const contains = (

    array,

    value

)=>

    (array ?? [])

        .map(

            normalize

        )

        .includes(

            normalize(

                value

            )

        );

const clone = lure=>({

    ...lure,

    score:0,

    motivos:[]

});

/*=========================================================
Espécie
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

        .find(

            item=>

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

    const score =

        (especie.afinidade ?? 0)

        * 10;

    lure.motivos.push(

        `Espécie: ${filters.especie}`

    );

    return score;

};

/*=========================================================
Horário
=========================================================*/

const scoreTime = (

    lure,

    filters

)=>{

    if(

        !filters.horario

    ){

        return 0;

    }

    const map = {

        amanhecer:"amanhecer",

        manha:"manha",

        "manhã":"manha",

        tarde:"tarde",

        noite:"noite"

    };

    const key =

        map[

            normalize(

                filters.horario

            )

        ];

    if(

        !key

    ){

        return 0;

    }

    const score =

        (

            lure.horario?.[key]

            ??

            0

        ) * 2;

    if(

        score

    ){

        lure.motivos.push(

            `Horário: ${filters.horario}`

        );

    }

    return score;

};

/*=========================================================
Água
=========================================================*/

const scoreWater = (

    lure,

    filters

)=>{

    if(

        !filters.agua

    ){

        return 0;

    }

    const map = {

        limpa:"limpa",

        "turva leve":"turvaLeve",

        turva:"turva"

    };

    const key =

        map[

            normalize(

                filters.agua

            )

        ];

    if(

        !key

    ){

        return 0;

    }

    const score =

        (

            lure.agua?.[key]

            ??

            0

        ) * 3;

    if(

        score

    ){

        lure.motivos.push(

            `Água: ${filters.agua}`

        );

    }

    return score;

};

/*=========================================================
Local de Pesca
=========================================================*/

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

        lure.motivos.push(

            `Local: ${filters.local}`

        );

        return SCORE.PLACE;

    }

    return 0;

};

/*=========================================================
Montagem
=========================================================*/

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

        lure.motivos.push(

            `Montagem: ${filters.montagem}`

        );

        return SCORE.ASSEMBLY;

    }

    return -9999;

};

/*=========================================================
Tipo
=========================================================*/

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

        lure.motivos.push(

            `Tipo: ${filters.tipo}`

        );

        return SCORE.TYPE;

    }

    return -9999;

};

/*=========================================================
Peso
=========================================================*/

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

            String(

                lure.peso

            )

        )===

        normalize(

            filters.peso

        )

    ){

        lure.motivos.push(

            `Peso: ${filters.peso}`

        );

        return SCORE.WEIGHT;

    }

    return 0;

};

/*=========================================================
Flutuação
=========================================================*/

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

        lure.motivos.push(

            `Flutuação: ${filters.flutuacao}`

        );

        return SCORE.FLOAT;

    }

    return 0;

};

/*=========================================================
Estruturas
=========================================================*/

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

        estrutura=>{

            if(

                contains(

                    lure.estruturas,

                    estrutura

                )

            ){

                score +=

                    SCORE.STRUCTURE;

                lure.motivos.push(

                    `Estrutura: ${estrutura}`

                );

            }

        }

    );

    return score;

};

/*=========================================================
Trabalhos
=========================================================*/

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

        trabalho=>{

            if(

                contains(

                    lure.trabalhos,

                    trabalho

                )

            ){

                score +=

                    SCORE.WORK;

                lure.motivos.push(

                    `Trabalho: ${trabalho}`

                );

            }

        }

    );

    return score;

};

/*=========================================================
Profundidade
=========================================================*/

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

        descricao===

        normalize(

            filters.profundidade

        )

    ){

        lure.motivos.push(

            `Profundidade: ${filters.profundidade}`

        );

        return SCORE.DEPTH;

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

    lure.score = 0;

    lure.motivos = [];

    lure.score +=

        scoreSpecies(

            lure,

            filters

        );

    lure.score +=

        scoreTime(

            lure,

            filters

        );

    lure.score +=

        scoreWater(

            lure,

            filters

        );

    lure.score +=

        scorePlace(

            lure,

            filters

        );

    lure.score +=

        scoreAssembly(

            lure,

            filters

        );

    lure.score +=

        scoreType(

            lure,

            filters

        );

    lure.score +=

        scoreWeight(

            lure,

            filters

        );

    lure.score +=

        scoreFloat(

            lure,

            filters

        );

    lure.score +=

        scoreStructure(

            lure,

            filters

        );

    lure.score +=

        scoreWork(

            lure,

            filters

        );

    lure.score +=

        scoreDepth(

            lure,

            filters

        );

    return lure.score;

};

/*=========================================================
Pesquisa
=========================================================*/

const search = filters => {

    if(

        !hasFilter(

            filters

        )

    ){

        return [];

    }

    return window.Database

        .get(

            "iscas"

        )

        .map(

            lure=>

                clone(

                    lure

                )

        )

        .map(

            lure=>{

                calculateScore(

                    lure,

                    filters

                );

                return lure;

            }

        )

        .filter(

            lure=>

                lure.score >= 0

        )

        .sort(

            (a,b)=>

                b.score -

                a.score

        );

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