/*
=========================================================
FishBook
Recommendation Service V2
=========================================================
*/

(() => {

"use strict";

/*=========================================================
Pesos
=========================================================*/

const WEIGHTS = Object.freeze({

    especie:50,

    agua:15,

    horario:10,

    local:10,

    estrutura:8,

    trabalho:8,

    profundidade:6,

    montagem:6,

    flutuacao:5,

    peso:5

});

/*=========================================================
Helpers
=========================================================*/

const normalize = value =>

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

const contains = (

    list,

    value

)=>

    (list ?? [])

        .map(

            normalize

        )

        .includes(

            normalize(

                value

            )

        );

const clone = lure => ({

    ...lure,

    pontos:0,

    maximo:0,

    score:0,

    motivos:[]

});

const addScore = (

    lure,

    peso,

    valor,

    motivo

)=>{

    lure.maximo += peso;

    lure.pontos +=

        peso * valor;

    if(

        motivo

    ){

        lure.motivos.push(

            motivo

        );

    }

};

const hasFilter = filters =>

    Object.values(

        filters

    ).some(

        value=>

            Array.isArray(

                value

            )

                ? value.length

                : Boolean(

                    value

                )

    );

    /*=========================================================
Espécie
=========================================================*/

const applySpecies = (

    lure,

    filters

)=>{

    if(

        !filters.especie ||

        filters.especie==="Todas"

    ){

        return;

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

        lure.score =

            -1;

        return;

    }

    addScore(

        lure,

        WEIGHTS.especie,

        (

            especie.afinidade ??

            0

        ) / 5,

        `Espécie: ${filters.especie}`

    );

};

/*=========================================================
Água
=========================================================*/

const applyWater = (

    lure,

    filters

)=>{

    if(

        !filters.agua

    ){

        return;

    }

    const key = {

        limpa:"limpa",

        "turva leve":"turvaLeve",

        turva:"turva"

    }[

        normalize(

            filters.agua

        )

    ];

    if(

        !key

    ){

        return;

    }

    addScore(

        lure,

        WEIGHTS.agua,

        (

            lure.agua?.[key] ??

            0

        ) / 5,

        `Água: ${filters.agua}`

    );

};

/*=========================================================
Horário
=========================================================*/

const applyTime = (

    lure,

    filters

)=>{

    if(

        !filters.horario

    ){

        return;

    }

    const key = {

        amanhecer:"amanhecer",

        manha:"manha",

        "manhã":"manha",

        tarde:"tarde",

        noite:"noite"

    }[

        normalize(

            filters.horario

        )

    ];

    if(

        !key

    ){

        return;

    }

    addScore(

        lure,

        WEIGHTS.horario,

        (

            lure.horario?.[key] ??

            0

        ) / 5,

        `Horário: ${filters.horario}`

    );

};

/*=========================================================
Local de Pesca
=========================================================*/

const applyPlace = (

    lure,

    filters

)=>{

    if(

        !filters.local

    ){

        return;

    }

    addScore(

        lure,

        WEIGHTS.local,

        contains(

            lure.aquiferos,

            filters.local

        )

            ? 1

            : 0,

        `Local: ${filters.local}`

    );

};

/*=========================================================
Tipo
=========================================================*/

const applyType = (

    lure,

    filters

)=>{

    if(

        !filters.tipo

    ){

        return;

    }

    if(

        normalize(

            lure.origem

        )!==

        normalize(

            filters.tipo

        )

    ){

        lure.score =

            -1;

    }

};

/*=========================================================
Montagem
=========================================================*/

const applyAssembly = (

    lure,

    filters

)=>{

    if(

        !filters.montagem

    ){

        return;

    }

    if(

        !contains(

            lure.montagens,

            filters.montagem

        )

    ){

        lure.score =

            -1;

        return;

    }

    addScore(

        lure,

        WEIGHTS.montagem,

        1,

        `Montagem: ${filters.montagem}`

    );

};

/*=========================================================
Profundidade
=========================================================*/

const applyDepth = (

    lure,

    filters

)=>{

    if(

        !filters.profundidade

    ){

        return;

    }

    addScore(

        lure,

        WEIGHTS.profundidade,

        normalize(

            lure.profundidade?.descricao

        )===

        normalize(

            filters.profundidade

        )

            ? 1

            : 0,

        `Profundidade: ${filters.profundidade}`

    );

};

/*=========================================================
Estrutura
=========================================================*/

const applyStructure = (

    lure,

    filters

)=>{

    if(

        !filters.estrutura.length

    ){

        return;

    }

    const matches =

        filters.estrutura.filter(

            item=>

                contains(

                    lure.estruturas,

                    item

                )

        ).length;

    addScore(

        lure,

        WEIGHTS.estrutura,

        matches /

        filters.estrutura.length,

        matches

            ? "Estrutura"

            : null

    );

};

/*=========================================================
Trabalho
=========================================================*/

const applyWork = (

    lure,

    filters

)=>{

    if(

        !filters.trabalho.length

    ){

        return;

    }

    const matches =

        filters.trabalho.filter(

            item=>

                contains(

                    lure.trabalhos,

                    item

                )

        ).length;

    addScore(

        lure,

        WEIGHTS.trabalho,

        matches /

        filters.trabalho.length,

        matches

            ? "Trabalho"

            : null

    );

};

/*=========================================================
Flutuação
=========================================================*/

const applyFloat = (

    lure,

    filters

)=>{

    if(

        !filters.flutuacao

    ){

        return;

    }

    addScore(

        lure,

        WEIGHTS.flutuacao,

        normalize(

            lure.flutuacao

        )===

        normalize(

            filters.flutuacao

        )

            ? 1

            : 0,

        `Flutuação: ${filters.flutuacao}`

    );

};

/*=========================================================
Peso
=========================================================*/

const applyWeight = (

    lure,

    filters

)=>{

    if(

        !filters.peso ||

        !lure.peso

    ){

        return;

    }

    addScore(

        lure,

        WEIGHTS.peso,

        normalize(

            String(

                lure.peso

            )

        )===

        normalize(

            filters.peso

        )

            ? 1

            : 0,

        `Peso: ${filters.peso}`

    );

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

            clone

        )

        .map(

            lure=>{

                applyType(

                    lure,

                    filters

                );

                if(

                    lure.score<0

                ){

                    return lure;

                }

                applySpecies(

                    lure,

                    filters

                );

                if(

                    lure.score<0

                ){

                    return lure;

                }

                applyWater(

                    lure,

                    filters

                );

                applyTime(

                    lure,

                    filters

                );

                applyPlace(

                    lure,

                    filters

                );

                applyAssembly(

                    lure,

                    filters

                );

                if(

                    lure.score<0

                ){

                    return lure;

                }

                applyDepth(

                    lure,

                    filters

                );

                applyStructure(

                    lure,

                    filters

                );

                applyWork(

                    lure,

                    filters

                );

                applyFloat(

                    lure,

                    filters

                );

                applyWeight(

                    lure,

                    filters

                );

                lure.score =

                    lure.maximo

                        ? Math.round(

                            (

                                lure.pontos /

                                lure.maximo

                            ) * 100

                        )

                        : 0;

                return lure;

            }

        )

        .filter(

            lure=>

                lure.score>=0

        )

        .sort(

            (a,b)=>{

                if(

                    b.score!==a.score

                ){

                    return b.score-a.score;

                }

                return (

                    b.eficiencia ??

                    0

                )-(

                    a.eficiencia ??

                    0

                );

            }

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