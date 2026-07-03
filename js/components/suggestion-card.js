/*
=========================================================
FishBook
Suggestion Card
=========================================================
*/

(() => {

"use strict";

/*=========================================================
Compatibilidade
=========================================================*/

const getCompatibility = score => {

    score = Number(score ?? 0);

    if(score >= 96){

        return "⭐ Excelente";

    }

    if(score >= 86){

        return "🟢 Muito boa";

    }

    if(score >= 76){

        return "🔵 Boa";

    }

    if(score >= 60){

        return "🟡 Regular";

    }

    return "🔴 Baixa";

};

/*=========================================================
Helpers
=========================================================*/

const createLine = text => {

    const line =
        document.createElement("p");

    line.className =
        "suggestion-line";

    line.textContent =
        text;

    return line;

};

const joinSpecies = lure =>

    (lure.especies ?? [])

        .map(

            item =>

                item.nome

        )

        .join(" • ");

const joinAssemblies = lure =>

    (lure.montagens ?? [])

        .join(" • ");

const getPhoto = lure => {

    const base =

        window.FishBook
            ?.Config
            ?.Constantes
            ?.fotoIsca

        ??

        "assets/iscas/";

    return base +

        (

            lure.foto ??

            "sem-foto.png"

        );

};

const create = lure => {

    const card =
        document.createElement(

            "article"

        );

    card.className =
        "suggestion-card";

    const left =
        document.createElement(

            "div"

        );

    left.className =
        "suggestion-left";

    const photo =
        document.createElement(

            "img"

        );

    photo.className =
        "suggestion-photo";

    photo.loading =
        "lazy";

    photo.alt =
        lure.nome ?? "";

    photo.src =

        getPhoto(

            lure

        );

    photo.addEventListener(

        "click",

        ()=>{

            window.Router.open(

                "ficha",

                lure.id

            );

        }

    );

    left.append(

        photo

    );

    const right =
        document.createElement(

            "div"

        );

    right.className =
        "suggestion-right";

    const title =
        document.createElement(

            "h3"

        );

    title.className =
        "suggestion-title";

    title.textContent =
        lure.nome ?? "";

    right.append(

        title

    );

    /*=========================================================
Informações
=========================================================*/

    const info =

        [

            lure.origem,

            lure.subcategoria,

            lure.peso

                ? `${lure.peso} g`

                : null,

            lure.flutuacao

        ]

        .filter(

            Boolean

        )

        .join(

            " • "

        );

    if(

        info

    ){

        right.append(

            createLine(

                info

            )

        );

    }

    const especies =

        joinSpecies(

            lure

        );

    if(

        especies

    ){

        right.append(

            createLine(

                "🎯 " +

                especies

            )

        );

    }

    const montagens =

        joinAssemblies(

            lure

        );

    if(

        montagens

    ){

        right.append(

            createLine(

                "🎣 " +

                montagens

            )

        );

    }

       const compatibilidade =
        document.createElement(

            "p"

        );

    compatibilidade.className =
        "suggestion-compatibility";

    compatibilidade.textContent =

        "✔️ Compatibilidade: " +

        getCompatibility(

            lure.score

        );

    right.append(

        compatibilidade

    );

/*=========================================================
Botão
=========================================================*/

    const footer =
        document.createElement(

            "div"

        );

    footer.className =
        "suggestion-footer";

    const button =
        document.createElement(

            "button"

        );

    button.type =
        "button";

    button.className =
        "button";

    button.textContent =
        "Abrir ficha";

    button.onclick = ()=>{

        window.Router.open(

            "ficha",

            lure.id

        );

    };

    footer.append(

        button

    );

    right.append(

        footer

    );

    card.append(

        left,

        right

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

window.FishBook.Components.SuggestionCard =

    Object.freeze({

        create

    });

})();