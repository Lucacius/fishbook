/*
=========================================================
FishBook
Dicionário do Sistema
=========================================================
*/

(() => {

"use strict";

window.FishBook =
    window.FishBook ?? {};

window.FishBook.Config =
    window.FishBook.Config ?? {};

window.FishBook.Config.Dicionario =

    Object.freeze({

        especies:[

            "Tucunaré",

            "Traíra",

            "Tilápia",

            "Robalo"

        ],

        horarios:[

            "amanhecer",

            "manha",

            "tarde",

            "noite"

        ],

        aguas:[

            "limpa",

            "turvaLeve",

            "turva"

        ],

        profundidades:[

            "Superfície",

            "Meia Água",

            "Fundo"

        ],

        estruturas:[

            "Barranco",

            "Galhada",

            "Vegetação pesada",

            "Capim",

            "Pedra",

            "Laje",

            "Ponte",

            "Praia",

            "Canal",

            "Margem"

        ],

        trabalhos:[

            "Zig-Zag",

            "Toques",

            "Popping",

            "Pausas",

            "Hélice",

            "Recolhimento",

            "Jerking",

            "Twitch",

            "Stop and Go",

            "Rolling",

            "Bottom",

            "Jumping"

        ],

        constantes:[

            "Floating",

            "Suspending",

            "Sinking"

        ],

        pesos:[

            "0-8",

            "9-12",

            "13-16",

            "17-25",

            "25+"

        ]

    });

})();