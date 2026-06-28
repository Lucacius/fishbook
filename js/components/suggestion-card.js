/*
=========================================================
FishBook
Suggestion Card
=========================================================
*/

(() => {

"use strict";

const criarEstrelas = nota=>{

    const stars =
        document.createElement("div");

    stars.className =
        "suggestion-stars";

    for(let i=1;i<=5;i++){

        stars.textContent +=

            i<=nota

                ? "★"

                : "☆";

    }

    return stars;

};

const create = suggestion=>{

    const card =
        document.createElement("article");

    card.className =
        "suggestion-card";

    /*=====================================
    Cabeçalho
    =====================================*/

    const header =
        document.createElement("div");

    header.className =
        "suggestion-header";

    const title =
        document.createElement("h3");

    title.className =
        "suggestion-title";

    title.textContent =
        suggestion.nome;

    header.append(title);

    card.append(header);

    /*=====================================
    Estrelas
    =====================================*/

    card.append(

        criarEstrelas(

            suggestion.eficiencia

        )

    );

    /*=====================================
    Motivos
    =====================================*/

    if(

        suggestion.motivos?.length

    ){

        const motivos =
            document.createElement("div");

        motivos.className =
            "suggestion-motivos";

        suggestion.motivos.forEach(item=>{

            const tag =
                document.createElement("span");

            tag.className =
                "suggestion-motivo";

            tag.textContent =
                "✔ " + item;

            motivos.append(tag);

        });

        card.append(motivos);

    }

    /*=====================================
    Quantidade
    =====================================*/

    const quantidade =
        document.createElement("p");

    quantidade.className =
        "suggestion-quantity";

    quantidade.textContent =

        `${suggestion.quantidade} código(s) disponível(is)`;

    card.append(

        quantidade

    );

    /*=====================================
    Códigos
    =====================================*/

    const codes =
        document.createElement("div");

    codes.className =
        "suggestion-codes";

    suggestion.codigos.forEach(codigo=>{

        const button =
            document.createElement("button");

        button.type =
            "button";

        button.className =
            "suggestion-code";

        button.textContent =
            codigo;

        button.onclick=()=>{

            window.Router.open(

                "ficha",

                codigo

            );

        };

        codes.append(button);

    });

    card.append(codes);

    return card;

};

window.FishBook =
    window.FishBook ?? {};

window.FishBook.Components =
    window.FishBook.Components ?? {};

window.FishBook.Components.SuggestionCard =

    Object.freeze({

        create

    });

})();