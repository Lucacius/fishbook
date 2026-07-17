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

        icon: "🏠"

    },

    {

        id: "escolher",

        icon: "🎯"

    },

    {

        id: "catalogo",

        icon: "📖"

    },

 {

        id: "cores",

        icon: "🎨"

    },

    {

        id: "diario",

        icon: "📝"

    },

    {

        id: "configuracoes",

        icon: "⚙️"

    }

];

    items.forEach(item => {

        const button =
            document.createElement("button");

        button.className =
             "navbar-button";

        if (item.id === active) {

            button.classList.add(
                "navbar-active"
            );

        }

        button.textContent =
    item.icon;

button.onclick = () => {

    window.Router.open(item.id);

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

window.FishBook.Components.Navbar =
    Object.freeze({

        create

    });

})();