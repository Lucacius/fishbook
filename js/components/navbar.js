/*
=========================================================
FishBook
Componente Navbar
=========================================================
*/

(() => {

"use strict";

/*=========================================================
Criação
=========================================================*/

const create = (active = "") => {

    const nav =
        document.createElement("nav");

    nav.className =
        "navbar";

    const items = [

        {

            id: "home",

            icon: "🏠",

            text: "Início"

        },

        {

            id: "catalogo",

            icon: "📖",

            text: "Catálogo"

        },

        {

            id: "escolher",

            icon: "🎣",

            text: "Escolher"

        }

    ];

    items.forEach(item => {

        const button =
            document.createElement("button");

        button.className =
            "button button-secondary navbar-button";

        if (item.id === active) {

            button.classList.add(
                "navbar-active"
            );

        }

        button.textContent =
            `${item.icon} ${item.text}`;

        button.onclick = () => {

            if (item.id !== active) {

                window.Router.open(item.id);

            }

        };

        nav.append(button);

    });

    return nav;

};

/*=========================================================
Exportação
=========================================================*/

window.FishBook =
    window.FishBook ?? {};

window.FishBook.Components =
    window.FishBook.Components ?? {};

window.FishBook.Components.navbar =
    Object.freeze({

        create

    });

})();