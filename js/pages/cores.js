/*
=========================================================
FishBook
Página Guia de Cores
=========================================================
*/

(() => {

"use strict";

let colors = [];

let filtered = [];

let listElement;

let contadorElement;

/*=========================================================
Carrega
=========================================================*/

const load = ()=>{

    colors =

      window.Database.getColors();

    filtered =

        [...colors];

};

/*=========================================================
Cabeçalho
=========================================================*/

const renderHeader = ()=>{

    const header =
        document.createElement("header");

    header.className =
        "catalogo-header";

    const title =
        document.createElement("h1");

    title.textContent =
        "🎨 Guia de Cores";

    const subtitle =
        document.createElement("p");

    contadorElement =
        subtitle;

    header.append(

        title,

        subtitle

    );

    return header;

};

/*=========================================================
Busca
=========================================================*/

const renderSearch = ()=>{

    const input =
        document.createElement("input");

    input.className =
        "input";

    input.placeholder =
        "Pesquisar cor...";

    input.oninput = ()=>{

        const value =

            input.value

            .trim()

            .toLowerCase();

        filtered =

            colors.filter(color=>

                color.nome

                    .toLowerCase()

                    .includes(value)

            );

        updateList();

    };

    return input;

};

/*=========================================================
Lista
=========================================================*/

const updateList = ()=>{

    contadorElement.textContent =

        `${filtered.length} cores`;

    listElement.replaceChildren();

    filtered

        .sort(

            (a,b)=>

                a.nome.localeCompare(

                    b.nome

                )

        )

        .forEach(color=>{

            listElement.append(

                window.FishBook

                    .Components

                    .ColorCard

                    .create({

                        color,

                        onClick:()=>{

                            window.Router.open(

                                "cor",

                                color.id

                            );

                        }

                    })

            );

        });

};

/*=========================================================
Render
=========================================================*/

const render = ()=>{

    const root =

        document.querySelector(

            "#app"

        );

    const page =
        document.createElement("div");

    page.className =
        "catalogo";

    listElement =
        document.createElement("section");

    listElement.className =
        "catalogo-list";

    page.append(

        window.FishBook

            .Components

            .Navbar

            .create(

                "cores"

            ),

        renderHeader(),

        renderSearch(),

        listElement

    );

    root.replaceChildren(

        page

    );

    updateList();

};

/*=========================================================
Página
=========================================================*/

const Cores = {

    async open(){

        load();

        render();

    },

    async close(){

        document

            .querySelector(

                "#app"

            )

            ?.replaceChildren();

    }

};

window.FishBook =
    window.FishBook ?? {};

window.FishBook.Pages =
    window.FishBook.Pages ?? {};

window.FishBook.Pages.Cores =

    Object.freeze(

        Cores

    );

window.Router.register(

    "cores",

    Cores

);

})();