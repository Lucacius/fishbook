/*
=========================================================
FishBook
Página Escolher Isca
=========================================================
*/

(() => {

"use strict";

/*=========================================================
Dependências
=========================================================*/

const {

    FilterGroup,

    SuggestionCard

} = window.FishBook.Components;

const {

    Recommendation,


    Filters

} = window.FishBook.Services;

/*=========================================================
Estado
=========================================================*/

const filters = {

    especie: null,

    local: null,

    horario: null,

    agua: null,

    estrutura: [],

    profundidade: null,

    tipo: null,

    montagem: null,

    peso: null,

    flutuacao: null,

    trabalho: [],

    prioridade: null

};

let resultContainer = null;

/*=========================================================
Cria filtro
=========================================================*/

const createFilter = (

    title,

    name,

    options,

    type = "radio"

) =>

    FilterGroup.create({

        title,

        name,

        type,

        options,

        onChange:

            updateFilters

    });

/*=========================================================
Cabeçalho
=========================================================*/

const renderHeader = () => {

    const title =
        document.createElement("h1");

    title.textContent =
        "🎯 Escolher Isca";

    return title;

};

/*=========================================================
Botões
=========================================================*/

const renderActions = () => {

    const container =
        document.createElement("div");

    container.className =
        "escolher-actions";

    const clearButton =
        document.createElement("button");

    clearButton.className =
        "button button-primary";

    clearButton.textContent =
        "Limpar filtros";

    clearButton.onclick = () => {

        document

            .querySelectorAll(

                ".filter-group input"

            )

            .forEach(

                input =>

                    input.checked = false

            );

        updateFilters();

    };

    container.append(

        clearButton

    );

    return container;

};

/*=========================================================
Filtros
=========================================================*/

const renderFilters = () => {

    const container =
        document.createElement("div");

    container.className =
        "escolher-filters";

    container.append(

        createFilter(

            "Espécie",

            "especie",

            [

                "Todas",

                ...Filters.getSpecies()

            ]

        ),

        createFilter(

            "Local de Pesca",

            "local",

            Filters.getPlaces()

        ),

        createFilter(

            "Horário",

            "horario",

            Filters.getTime()

        ),

        createFilter(

            "Água",

            "agua",

            Filters.getWater()

        ),

        createFilter(

            "Estrutura",

            "estrutura",

            Filters.getStructures(),

            "checkbox"

        ),

        createFilter(

            "Profundidade",

            "profundidade",

            Filters.getDepth()

        ),

        createFilter(

            "Tipo de Isca",

            "tipo",

            Filters.getLureType()

        ),

        createFilter(

            "Montagem",

            "montagem",

            Filters.getAssemblies()
        ),

        createFilter(

            "Peso",

            "peso",

            Filters.getWeights()

        ),

        createFilter(

            "Flutuação",

            "flutuacao",

            Filters.getFlotation()

        ),

        createFilter(

            "Trabalho",

            "trabalho",

            Filters.getWorks(),

            "checkbox"

        ),

        createFilter(

            "Prioridade",

            "prioridade",

            Filters.getPriority()

        )

    );

    return container;

};

/*=========================================================
Atualiza filtros
=========================================================*/

const updateFilters = () => {

    filters.especie =
        FilterGroup.getValue(
            "especie"
        );

    filters.local =
        FilterGroup.getValue(
            "local"
        );

    filters.horario =
        FilterGroup.getValue(
            "horario"
        );

    filters.agua =
        FilterGroup.getValue(
            "agua"
        );

    filters.estrutura =
        FilterGroup.getValues(
            "estrutura"
        );

    filters.profundidade =
        FilterGroup.getValue(
            "profundidade"
        );

    filters.tipo =
        FilterGroup.getValue(
            "tipo"
        );

    filters.montagem =
        FilterGroup.getValue(
            "montagem"
        );

    filters.peso =
        FilterGroup.getValue(
            "peso"
        );

    filters.flutuacao =
        FilterGroup.getValue(
            "flutuacao"
        );

    filters.trabalho =
        FilterGroup.getValues(
            "trabalho"
        );

    filters.prioridade =
        FilterGroup.getValue(
            "prioridade"
        );

    renderSuggestions();

};

/*=========================================================
Sugestões
=========================================================*/

const renderSuggestions = () => {

    const results =
       Recommendation.search(
            filters
        );

    resultContainer.replaceChildren();

if (

    !Object.values(

        filters

    ).some(

        value =>

            Array.isArray(

                value

            )

                ? value.length

                : value

    )

) {

    const empty =
        document.createElement("p");

    empty.className =
        "suggestion-empty";

    empty.textContent =
        "Selecione pelo menos um critério para receber recomendações.";

    resultContainer.append(

        empty

    );

    return;

}

if (

    results.length === 0

) {

    const empty =
        document.createElement("p");

    empty.className =
        "suggestion-empty";

    empty.textContent =
        "Nenhuma isca atende aos critérios selecionados. Tente remover alguns filtros.";

    resultContainer.append(

        empty

    );

    return;

}

    results.forEach(

        lure =>

            resultContainer.append(

                SuggestionCard.create(
                    lure
                )

            )

    );

};

/*=========================================================
Render
=========================================================*/

const render = () => {

    const root =
        document.querySelector(
            "#app"
        );

    if (

        !root

    ) {

        return;

    }

    const page =
        document.createElement(
            "div"
        );

    page.className =
        "escolher-page";

    const titleSuggestions =
        document.createElement(
            "h2"
        );

    titleSuggestions.textContent =
        "Sugestões";

    resultContainer =
        document.createElement(
            "div"
        );

    resultContainer.className =
        "suggestion-list";

    page.append(

        window.FishBook
            .Components
            .Navbar
            .create(
                "escolher"
            ),

        renderHeader(),

        renderFilters(),

        renderActions(),

        titleSuggestions,

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

    async open() {

        render();

    },

    async close() {

        document

            .querySelector(

                "#app"

            )

            ?.replaceChildren();

    }

});

window.FishBook =
    window.FishBook ?? {};

window.FishBook.Pages =
    window.FishBook.Pages ?? {};

window.FishBook.Pages.Escolher =
    EscolherPage;

window.Router.register(

    "escolher",

    EscolherPage

);

})();