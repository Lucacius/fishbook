/*
=========================================================
FishBook
Constantes do Sistema
=========================================================
*/

(() => {

"use strict";

window.FishBook =
    window.FishBook ?? {};

window.FishBook.Config =
    window.FishBook.Config ?? {};

window.FishBook.Config.Constantes = Object.freeze({

    statusEstoque: [

        {

            id: "Ativa",

            cor: "status-ativa"

        },

        {

            id: "Reserva",

            cor: "status-reserva"

        },

        {

            id: "Manutenção",

            cor: "status-manutencao"

        },

        {

            id: "Baixada",

            cor: "status-baixada"

        }

    ],

    versao: "0.0.53",

    nomeSistema: "FishBook"

});

})();