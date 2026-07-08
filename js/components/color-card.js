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
        "lure-card";

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
        "lure-card__image";

    image.alt =
        color.nome;

    image.src =
        `assets/cores/${color.id}.png`;

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
        "lure-card__content";

    const code =
        document.createElement("span");

    code.className =
        "lure-card__code";

    code.textContent =
        color.id;

    const title =
        document.createElement("h2");

    title.className =
        "lure-card__title";

    title.textContent =
        color.nome;

    const group =
        document.createElement("div");

    group.className =
        "ficha-subtitulo";

    group.textContent =
        color.grupo;

    const resumo =
        document.createElement("p");

    resumo.textContent =
        color.resumo;

    const button =
        document.createElement("button");

    button.className =
        "button";

    button.textContent =
        "Abrir ficha";

    button.onclick = event=>{

        event.stopPropagation();

        onClick?.();

    };

    content.append(

        code,

        title,

        group,

        resumo,

        button

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