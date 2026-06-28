/*
 * Badge reutilizável do FishBook.
 */

(() => {
    "use strict";

    const MAP = {
        5: {
            text: "Excelente",
            className: "badge-5"
        },
        4: {
            text: "Muito boa",
            className: "badge-4"
        },
        3: {
            text: "Boa",
            className: "badge-3"
        },
        2: {
            text: "Regular",
            className: "badge-2"
        },
        1: {
            text: "Baixa",
            className: "badge-1"
        }
    };

    const create = ({ value }) => {

        const badge = document.createElement("span");

        badge.classList.add("badge");

        const item = MAP[value] ?? {
            text: "Sem nota",
            className: "badge-0"
        };

        badge.classList.add(item.className);

        badge.textContent = item.text;

        return badge;

    };

    window.FishBook =
        window.FishBook ?? {};

    window.FishBook.Components =
        window.FishBook.Components ?? {};

    window.FishBook.Components.Badge =
        Object.freeze({
            create
        });

})();