/*
=========================================================
FishBook
Color Card
=========================================================
*/

(() => {

"use strict";

/*=========================================================
Criação
=========================================================*/

const create = ({

    color,

    onClick = null

})=>{

    const card =
        document.createElement("article");

    card.className =
        "color-card";

    if(typeof onClick === "function"){

        card.tabIndex = 0;

        card.role = "button";

        card.addEventListener(

            "click",

            onClick

        );

        card.addEventListener(

            "keydown",

            event=>{

                if(

                    event.key==="Enter" ||

                    event.key===" "

                ){

                    event.preventDefault();

                    onClick();

                }

            }

        );

    }

    /*=====================================================
    Foto
    =====================================================*/

    const image =
        document.createElement("img");

    image.className =
        "color-card-image";

    image.src =
        `assets/cores/${color.id}.png`;

    image.alt =
        color.nome;

    image.loading =
        "lazy";

    image.onerror = ()=>{

        image.onerror = null;

        image.src =
            "assets/cores/semfoto.png";

    };

    /*=====================================================
    Conteúdo
    =====================================================*/

    const content =
        document.createElement("div");

    content.className =
        "color-card-content";

    const group =
        document.createElement("div");

    group.className =
        "color-card-group";

    group.textContent =
        color.grupo;

    const title =
        document.createElement("h2");

    title.className =
        "color-card-title";

    title.textContent =
        color.nome;

    const summary =
        document.createElement("p");

    summary.className =
        "color-card-summary";

    summary.textContent =
        color.resumo;

    content.append(

        group,

        title,

        summary

    );

    card.append(

        image,

        content

    );

    return card;

};

/*=========================================================
Exportação
=========================================================*/

window.FishBook =
    window.FishBook ?? {};

window.FishBook.Components =
    window.FishBook.Components ?? {};

window.FishBook.Components.ColorCard =

    Object.freeze({

        create

    });

})();