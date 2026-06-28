/*
=========================================================
FishBook
Escolher Isca Service
=========================================================
*/

(() => {

"use strict";

const PESOS =
    window.FishBook.Config.Pesos;

/*=========================================================
Utilidades
=========================================================*/

const pesoCompativel = (peso, filtro)=>{

    if(!filtro){

        return true;

    }

    switch(filtro){

        case "0-8":

            return peso<=8;

        case "9-12":

            return peso>=9 && peso<=12;

        case "13-16":

            return peso>=13 && peso<=16;

        case "17-25":

            return peso>=17 && peso<=25;

        case "25+":

            return peso>25;

        default:

            return true;

    }

};

const constanteCompativel = (lure,filtro)=>{

    if(!filtro){

        return true;

    }

    return (

        lure.constante===

        filtro

    );

};

/*=========================================================
Motivos
=========================================================*/

const criarMotivos = (lure,filters)=>{

    const motivos=[];

    if(

        filters.especie &&

        lure.alvos?.includes(

            filters.especie

        )

    ){

        motivos.push(

            filters.especie

        );

    }

    if(

        filters.horario &&

        (lure.horario?.[filters.horario] ?? 0)>0

    ){

        motivos.push(

            filters.horario

        );

    }

    if(

        filters.agua &&

        (lure.agua?.[filters.agua] ?? 0)>0

    ){

        motivos.push(

            filters.agua

        );

    }

    if(

        filters.profundidade &&

        lure.profundidade?.tipo===

        filters.profundidade

    ){

        motivos.push(

            filters.profundidade

        );

    }

    filters.estruturas.forEach(item=>{

        if(

            lure.estrutura?.includes(item)

        ){

            motivos.push(item);

        }

    });

    filters.trabalhos.forEach(item=>{

        if(

            lure.trabalho?.includes(item)

        ){

            motivos.push(item);

        }

    });

    if(filters.peso){

        motivos.push(

            `${lure.peso} g`

        );

    }

    if(

        filters.constante &&

        lure.constante

    ){

        motivos.push(

            lure.constante

        );

    }

    return [

        ...new Set(

            motivos

        )

    ];

};

/*=========================================================
Pontuação
=========================================================*/

const calcularNota = (lure,filters)=>{

    if(

        !pesoCompativel(

            lure.peso,

            filters.peso

        )

    ){

        return 0;

    }

    if(

        !constanteCompativel(

            lure,

            filters.constante

        )

    ){

        return 0;

    }

    let nota=0;

    if(

        filters.especie &&

        lure.alvos?.includes(

            filters.especie

        )

    ){

        nota+=

            PESOS.especie;

    }

    if(filters.horario){

        nota+=

            (lure.horario?.[filters.horario] ?? 0)

            *

            PESOS.horario;

    }

    if(filters.agua){

        nota+=

            (lure.agua?.[filters.agua] ?? 0)

            *

            PESOS.agua;

    }

    if(

        filters.profundidade &&

        lure.profundidade?.tipo===

        filters.profundidade

    ){

        nota+=

            PESOS.profundidade;

    }

    filters.estruturas.forEach(item=>{

        if(

            lure.estrutura?.includes(item)

        ){

            nota+=

                PESOS.estrutura;

        }

    });

    filters.trabalhos.forEach(item=>{

        if(

            lure.trabalho?.includes(item)

        ){

            nota+=

                PESOS.trabalho;

        }

    });

    return nota;

};

/*=========================================================
Pesquisa
=========================================================*/

const search = filters=>{

    const grupos =
        new Map();

    window.Database

        .getLures()

        .forEach(lure=>{

            const nota =

                calcularNota(

                    lure,

                    filters

                );

            if(

                nota<=0

            ){

                return;

            }

            const motivos =

                criarMotivos(

                    lure,

                    filters

                );

            const chave =

                lure.nome;

            if(

                !grupos.has(

                    chave

                )

            ){

                grupos.set(

                    chave,

                    {

                        nome:

                            lure.nome,

                        categoria:

                            lure.categoria,

                        eficiencia:

                            lure.eficiencia ?? 0,

                        nota,

                        quantidade:0,

                        motivos:[

                            ...motivos

                        ],

                        codigos:[]

                    }

                );

            }

            const grupo =

                grupos.get(

                    chave

                );

            grupo.nota =

                Math.max(

                    grupo.nota,

                    nota

                );

            grupo.eficiencia =

                Math.max(

                    grupo.eficiencia,

                    lure.eficiencia ?? 0

                );

            grupo.quantidade++;

            grupo.codigos.push(

                lure.id

            );

            grupo.motivos =

                [

                    ...new Set(

                        [

                            ...grupo.motivos,

                            ...motivos

                        ]

                    )

                ];

        });

    return [

        ...grupos.values()

    ]

    .sort(

        (a,b)=>{

            if(

                b.nota!==a.nota

            ){

                return (

                    b.nota-

                    a.nota

                );

            }

            if(

                b.eficiencia!==

                a.eficiencia

            ){

                return (

                    b.eficiencia-

                    a.eficiencia

                );

            }

            if(

                b.quantidade!==

                a.quantidade

            ){

                return (

                    b.quantidade-

                    a.quantidade

                );

            }

            return a.nome.localeCompare(

                b.nome,

                "pt-BR"

            );

        }

    )

    .slice(0,10);

};

/*=========================================================
API
=========================================================*/

const EscolherService =

    Object.freeze({

        search

    });

window.FishBook =
    window.FishBook ?? {};

window.FishBook.Services =
    window.FishBook.Services ?? {};

window.FishBook.Services.Escolher =
    EscolherService;

})();