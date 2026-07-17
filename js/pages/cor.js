/*
=========================================================
FishBook
Página Cor
=========================================================
*/

(() => {

"use strict";

let color = null;

/*=========================================================
Carrega Cor
=========================================================*/

const loadColor = id => {

    color =

        window.Database
            .getColor(id);

                console.log("ID recebido:", id);

    console.log("Cor encontrada:", color);

};

/*=========================================================
Helpers
=========================================================*/

const createStars = value => {

    const total = 5;

    return "★".repeat(value) +

        "☆".repeat(

            total - value

        );

};

const renderItem = (titulo, nota) => {

    const row =
        document.createElement("div");

    row.className =
        "cor-rating-row";

    const label =
        document.createElement("span");

    label.className =
        "cor-rating-label";

    label.textContent =
        titulo;

    row.append(label);

    row.append(

        window.FishBook
            .Components
            .Badge
            .create({
                value: nota
            })

    );

    return row;

};

/*=========================================================
Foto
=========================================================*/

const renderPhoto = () => {

    const image =
        document.createElement("img");

    image.className =
        "ficha-photo";

    image.src =
        `assets/cores/${color.id}.png`;

    image.alt =
        color.nome;

    image.onerror = () => {

        image.onerror = null;

        image.src =
            "assets/cores/semfoto.png";

    };

    return image;

};

/*=========================================================
Informações
=========================================================*/

const renderInfo = () => {

    const info =
        document.createElement("div");

    info.className =
        "ficha-right";

    const codigo =
        document.createElement("div");

    codigo.className =
        "ficha-codigo";

    codigo.textContent =
        color.id;

    const nome =
        document.createElement("h1");

    nome.textContent =
        color.nome;

    const grupo =
        document.createElement("div");

    grupo.className =
        "ficha-subtitulo";

    grupo.textContent =
        color.grupo;

    info.append(

        codigo,

        nome,

        grupo

    );

    return info;

};

/*=========================================================
Hero
=========================================================*/

const renderHero = () => {

    const card =
        document.createElement("section");

    card.className =
        "ficha-card";

    const left =
        document.createElement("div");

    left.className =
        "ficha-left";

    left.append(

        renderPhoto()

    );

    card.append(

        left,

        renderInfo()

    );

    return card;

};

/*=========================================================
Água
=========================================================*/

const renderWater = () => {

    const card =
        document.createElement("section");

    card.className =
        "ficha-card";

    const title =
        document.createElement("h2");

    title.textContent =
        "💧 Água";

    card.append(title);

    card.append(

        renderItem(

            "Limpa",

            color.agua.limpa

        ),

        renderItem(

            "Turva Leve",

            color.agua.turvaLeve

        ),

        renderItem(

            "Turva",

            color.agua.turva

        )

    );

    return card;

};

/*=========================================================
Tempo
=========================================================*/

const renderWeather = () => {

    const card =
        document.createElement("section");

    card.className =
        "ficha-card";

    const title =
        document.createElement("h2");

    title.textContent =
        "🌤️ Tempo";

    card.append(title);

    card.append(

        renderItem(

            "Nublado",

            color.tempo.nublado

        ),

        renderItem(

            "Sol",

            color.tempo.sol

        ),

        renderItem(

            "Sol Forte",

            color.tempo.solForte

        ),

        renderItem(

            "Chuva",

            color.tempo.chuva

        ),

        renderItem(

            "Noite",

            color.tempo.noite

        )

    );

    return card;

};

/*=========================================================
Horário
=========================================================*/

const renderSchedule = () => {

    const card =
        document.createElement("section");

    card.className =
        "ficha-card";

    const title =
        document.createElement("h2");

    title.textContent =
        "🕒 Melhor Horário";

    card.append(title);

    card.append(

        renderItem(

            "Amanhecer",

            color.horario.amanhecer

        ),

        renderItem(

            "Manhã",

            color.horario.manha

        ),

        renderItem(

            "Tarde",

            color.horario.tarde

        ),

        renderItem(

            "Entardecer",

            color.horario.entardecer

        ),

        renderItem(

            "Noite",

            color.horario.noite

        )

    );

    return card;

};

/*=========================================================
Resumo
=========================================================*/

const renderSummary = () => {

    const card =
        document.createElement("section");

    card.className =
        "ficha-card";

    const title =
        document.createElement("h2");

    title.textContent =
        "📝 Resumo";

    const text =
        document.createElement("p");

    text.textContent =
        color.resumo;

    card.append(

        title,

        text

    );

    return card;

};

/*=========================================================
Dica do FishBook
=========================================================*/

const renderTip = () => {

    const card =
        document.createElement("section");

    card.className =
        "ficha-card";

    const title =
        document.createElement("h2");

    title.textContent =
        "💡 Dica do FishBook";

    const text =
        document.createElement("p");

    text.textContent =
        color.dica;

    card.append(

        title,

        text

    );

    return card;

};

/*=========================================================
Iscas desta Cor
=========================================================*/

const renderLures = () => {

    const card =
        document.createElement("section");

    card.className =
        "ficha-card";

    const title =
        document.createElement("h2");

    title.textContent =
        "🎣 Iscas desta Cor";

    const list =
        document.createElement("div");

    list.className =
        "ficha-list";

    const lures =

        window.Database
            .getLures()
            .filter(lure =>

                (lure.cor ?? "")

                    .toUpperCase() ===

                color.id

            )
            .sort(

                (a,b)=>

                    a.nome.localeCompare(

                        b.nome

                    )

            );

    if(

        lures.length===0

    ){

        const empty =
            document.createElement("p");

        empty.textContent =
            "Nenhuma isca cadastrada nesta cor.";

        list.append(

            empty

        );

    }

    else{

        lures.forEach(lure=>{

            const button =
                document.createElement("button");

            button.className =
                "button";

            button.textContent =
                lure.nome;

            button.onclick = ()=>{

                window.Router.open(

                    "ficha",

                    lure.id

                );

            };

            list.append(

                button

            );

        });

    }

    card.append(

        title,

        list

    );

    return card;

};

/*=========================================================
Render
=========================================================*/

const render = ()=>{

    const root =
        document.querySelector("#app");

    if(

        !root

    ){

        return;

    }

    if(

        !color

    ){

        root.innerHTML =
            "<h2>Cor não encontrada.</h2>";

        return;

    }

    const page =
        document.createElement("div");

    page.className =
        "ficha";

    page.append(

        window.FishBook
            .Components
            .Navbar
            .create("cores"),

        renderHero(),

        renderWater(),

        renderWeather(),

        renderSchedule(),

        renderSummary(),

        renderTip(),

        renderLures()

    );

    root.replaceChildren(

        page

    );

};

/*=========================================================
Página
=========================================================*/

const Cor = {

    async open(id){

        loadColor(id);

        render();

    },

    async close(){

        document
            .querySelector("#app")
            ?.replaceChildren();

    }

};

/*=========================================================
Exportação
=========================================================*/

window.FishBook =
    window.FishBook ?? {};

window.FishBook.Pages =
    window.FishBook.Pages ?? {};

window.FishBook.Pages.Cor =

    Object.freeze(

        Cor

    );

window.Router.register(

    "cor",

    window.FishBook
        .Pages
        .Cor

);

})();