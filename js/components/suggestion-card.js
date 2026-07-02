/*
=========================================================
FishBook
Suggestion Card
=========================================================
*/

(() => {

"use strict";

/*=========================================================
Estrelas
=========================================================*/

const createStars = value => {

    const stars =
        document.createElement("div");

    stars.className =
        "suggestion-stars";

    const nota =
        Number(value ?? 0);

    for (

        let i = 1;

        i <= 5;

        i++

    ) {

        stars.textContent +=

            i <= nota

                ? "★"

                : "☆";

    }

    return stars;

};

/*=========================================================
Card
=========================================================*/

const create = suggestion => {

    const card =
        document.createElement("article");

    card.className =
        "suggestion-card";

    /*-------------------------
    Cabeçalho
    -------------------------*/

    const header =
        document.createElement("div");

    header.className =
        "suggestion-header";

    const title =
        document.createElement("h3");

    title.className =
        "suggestion-title";

    title.textContent =
        suggestion.nome ?? "Sem nome";

    header.append(title);

    card.append(header);

    /*-------------------------
    Estrelas
    -------------------------*/

    card.append(

        createStars(

            suggestion.eficiencia

        )

    );

    /*-------------------------
    Motivos
    -------------------------*/

    const motivos =

        Array.isArray(

            suggestion.motivos

        )

            ? suggestion.motivos

            : [];

    if (

        motivos.length

    ) {

        const container =
            document.createElement("div");

        container.className =
            "suggestion-motivos";

        motivos.forEach(item => {

            const tag =
                document.createElement("span");

            tag.className =
                "suggestion-motivo";

            tag.textContent =
                "✔ " + item;

            container.append(tag);

        });

        card.append(container);

    }

    /*-------------------------
    Quantidade
    -------------------------*/

    const quantidade =

        suggestion.quantidade ??

        suggestion.estoque ??

        0;

    const texto =
        document.createElement("p");

    texto.className =
        "suggestion-quantity";

    texto.textContent =

        `${quantidade} unidade(s) disponível(is)`;

    card.append(texto);

    /*-------------------------
    Códigos
    -------------------------*/

    const codigos =

        Array.isArray(

            suggestion.codigos

        )

            ? suggestion.codigos

            : [

                suggestion.id

            ];

    if (

        codigos.length

    ) {

        const codes =
            document.createElement("div");

        codes.className =
            "suggestion-codes";

        codigos.forEach(codigo => {

            if (

                !codigo

            ) {

                return;

            }

            const button =
                document.createElement("button");

            button.type =
                "button";

            button.className =
                "suggestion-code";

            button.textContent =
                codigo;

            button.onclick = () => {

                window.Router.open(

                    "ficha",

                    codigo

                );

            };

            codes.append(button);

        });

        card.append(codes);

    }

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