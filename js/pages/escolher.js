/*
=========================================================
FishBook
Página Escolher Isca
=========================================================
*/

(() => {

"use strict";

const {
    FilterGroup,
    SuggestionCard
} = window.FishBook.Components;

const {
    Escolher
} = window.FishBook.Services;

const FILTERS =
    window.FishBook
        .Config
        .Filters;

const createFilter = (

    title,

    name,

    options,

    type="radio"

)=>

    FilterGroup.create({

        title,

        name,

        type,

        options,

        onChange:

            updateFilters

    });

/*=========================================================
Filtros
=========================================================*/

const filters = {

    especie:null,

    horario:null,

    agua:null,

    profundidade:null,

    peso:null,

    constante:null,

    estruturas:[],

    trabalhos:[]

};

let resultContainer = null;

/*=========================================================
Atualiza filtros
=========================================================*/

const updateFilters = () => {

    filters.especie =
        FilterGroup.getValue(
            "especie"
        );

    filters.horario =
        FilterGroup.getValue(
            "horario"
        );

    filters.agua =
        FilterGroup.getValue(
            "agua"
        );

    filters.profundidade =
        FilterGroup.getValue(
            "profundidade"
        );

    filters.estruturas =
        FilterGroup.getValues(
            "estrutura"
        );

    filters.trabalhos =
        FilterGroup.getValues(
            "trabalho"
        );

filters.peso =
    FilterGroup.getValue(
        "peso"
    );

filters.constante =
    FilterGroup.getValue(
        "constante"
    );
    renderResults();

};

/*=========================================================
Resultados
=========================================================*/

const renderResults = ()=>{

    const results =

        Escolher.search(filters);

    resultContainer.replaceChildren();

    if(

        results.length===0

    ){

        const empty =
            document.createElement("p");

        empty.className =
            "suggestion-empty";

        empty.textContent =

            "Nenhuma isca encontrada. Experimente remover alguns filtros.";

        resultContainer.append(

            empty

        );

        return;

    }

    results.forEach(item=>{

        resultContainer.append(

            SuggestionCard.create(item)

        );

    });

};

/*=========================================================
Render
=========================================================*/

const render = () => {

    const root =
        document.querySelector("#app");

    const page =
        document.createElement("div");

    page.className =
        "escolher-page";

    /* Cabeçalho */

    const title =
        document.createElement("h1");

    title.textContent =
        "🎯 Escolher Isca";

    page.append(title);

    /* Espécie */

   page.append(

    createFilter(

        "Espécie",

        "especie",

        FILTERS.especies

    )

);

    /* Horário */

    page.append(

    createFilter(

        "Horário",

        "horario",

        FILTERS.horarios

    )

);

    /* Água */

    page.append(

    createFilter(

        "Água",

        "agua",

        FILTERS.aguas

    )

);


page.append(

    createFilter(

        "Profundidade",

        "profundidade",

        FILTERS.profundidades

    )

);

page.append(

    createFilter(

        "Peso",

        "peso",

        FILTERS.pesos

    )

);

page.append(

    createFilter(

        "Constante",

        "constante",

        FILTERS.constantes

    )

);

page.append(

    createFilter(

        "Estruturas",

        "estrutura",

        FILTERS.estruturas,

        "checkbox"

    )

);

page.append(

    createFilter(

        "Trabalhos",

        "trabalho",

        FILTERS.trabalhos,

        "checkbox"

    )

);


    /* Resultado */

    const resultTitle =
        document.createElement("h2");

const clearButton =
    document.createElement("button");

clearButton.className =
    "button button-primary";

clearButton.textContent =
    "Limpar filtros";

clearButton.onclick=()=>{

    document

        .querySelectorAll(

            ".filter-group input"

        )

        .forEach(input=>{

            input.checked=false;

        });

    updateFilters();

};

page.append(

    clearButton

);

    resultTitle.textContent =
        "Sugestões";

    page.append(resultTitle);

    resultContainer =
        document.createElement("div");

    resultContainer.className =
        "suggestion-list";

    page.append(
        resultContainer
    );

    root.replaceChildren(
        page
    );

updateFilters();

};

/*=========================================================
Página
=========================================================*/

const EscolherPage = Object.freeze({

    async open(){

        render();

    },

    async close(){

        document
            .querySelector("#app")
            ?.replaceChildren();

    }

});

window.FishBook.Pages =
    window.FishBook.Pages ?? {};

window.FishBook.Pages.Escolher =
    EscolherPage;

window.Router.register(

    "escolher",

    EscolherPage

);

})();