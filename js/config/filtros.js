/*
=========================================================
FishBook
Configuração dos Filtros
=========================================================
*/

(() => {

"use strict";

window.FishBook =
    window.FishBook ?? {};

window.FishBook.Config =
    window.FishBook.Config ?? {};

const D =

    window.FishBook

        .Config

        .Dicionario;

console.log("CONFIG", window.FishBook.Config);
console.log("DICIONARIO", D);

const mapOptions = lista=>

    lista.map(item=>({

        label:item,

        value:item

    }));

window.FishBook.Config.Filters =

    Object.freeze({

        especies:[

            {

                label:"Todas",

                value:null

            },

            ...mapOptions(

                D.especies

            )

        ],

        horarios:[

            {

                label:"Amanhecer",

                value:"amanhecer"

            },

            {

                label:"Manhã",

                value:"manha"

            },

            {

                label:"Tarde",

                value:"tarde"

            },

            {

                label:"Noite",

                value:"noite"

            }

        ],

        aguas:[

            {

                label:"Limpa",

                value:"limpa"

            },

            {

                label:"Turva Leve",

                value:"turvaLeve"

            },

            {

                label:"Turva",

                value:"turva"

            }

        ],

        profundidades:

            mapOptions(

                D.profundidades

            ),

        estruturas:

            mapOptions(

                D.estruturas

            ),

        trabalhos:

            mapOptions(

                D.trabalhos

            ),

        constantes:

            mapOptions(

                D.constantes

            ),

        pesos:[

            {

                label:"Até 8 g",

                value:"0-8"

            },

            {

                label:"9 a 12 g",

                value:"9-12"

            },

            {

                label:"13 a 16 g",

                value:"13-16"

            },

            {

                label:"17 a 25 g",

                value:"17-25"

            },

            {

                label:"Acima de 25 g",

                value:"25+"

            }

        ]

    });

})();