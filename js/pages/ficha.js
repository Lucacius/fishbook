/*
=========================================================
FishBook
Página da Ficha da Isca
=========================================================
*/

(() => {

"use strict";

let lure = null;

/*=========================================================
Carrega a isca
=========================================================*/

const loadLure = id => {

    lure = null;

    if (!id) {

        return;

    }

    if (!window.Database) {

        console.error("Database não carregado.");

        return;

    }

    lure = window.Database.getLure(id);

    if (!lure) {

        console.warn(`Isca "${id}" não encontrada.`);

    }

};

/*=========================================================
Utilidades
=========================================================*/

const createSection = titulo => {

    const section =
        document.createElement("section");

    section.className =
        "ficha-section";

    const h2 =
        document.createElement("h2");

    h2.textContent =
        titulo;

    section.append(h2);

    return section;

};

const createInfoRow = (label, value) => {

    const row =
        document.createElement("div");

    row.className =
        "ficha-info-row";

    const left =
        document.createElement("span");

    left.className =
        "ficha-info-label";

    left.textContent =
        label;

    const right =
        document.createElement("span");

    right.className =
        "ficha-info-value";

    right.textContent =
        value ?? "-";

    row.append(
        left,
        right
    );

    return row;

};

const createBadge = value =>

    window.FishBook
        .Components
        .Badge
        .create({
            value
        });

const createChip = texto => {

    const chip =
        document.createElement("span");

    chip.className =
        "chip";

    chip.textContent =
        texto;

    return chip;

};

const createStars = valor => {

    const nota =

        Number(valor) || 0;

    return "★★★★★"
        .slice(0, nota)
        .padEnd(5, "☆");

};
/*=========================================================
Cabeçalho
=========================================================*/

const renderHeader = () => {

    const header =
        document.createElement("header");

    header.className =
        "ficha-header";

    const voltar =
        document.createElement("button");

    voltar.className =
        "button button-secondary";

    voltar.textContent =
        "← Catálogo";

    voltar.onclick = () => {

        window.Router.open("catalogo");

    };

    const info =
        document.createElement("div");

    info.className =
        "ficha-header-info";

    const codigo =
        document.createElement("div");

    codigo.className =
        "ficha-codigo";

    codigo.textContent =
        lure.id;

    const nome =
        document.createElement("h1");

    nome.textContent =
        lure.nome;

    const subtitulo =
        document.createElement("div");

    subtitulo.className =
        "ficha-subtitulo";

    subtitulo.textContent = [

        lure.categoria,
        lure.subcategoria,
        lure.tipo

    ]

    .filter(Boolean)

    .join(" • ");

    info.append(

        codigo,
        nome,
        subtitulo

    );

    header.append(

        voltar,
        info,
        createBadge(
            lure.eficiencia ?? 0
        )

    );

    return header;

};/*=========================================================
Foto
=========================================================*/

const renderPhoto = () => {

    const container =
        document.createElement("div");

    container.className =
        "ficha-photo";

    const img =
        document.createElement("img");

    img.className =
        "foto-isca";

    img.alt =
        lure.nome;

    img.loading =
        "lazy";

    img.src = `assets/iscas/${lure.id}.png`;

img.onerror = () => {

    img.onerror = null;

    img.src = "assets/iscas/semfoto.png";

};

    container.append(img);

    return container;

};

/*=========================================================
Informações
=========================================================*/

const renderInfo = () => {

    const container =
        document.createElement("div");

    container.className =
        "ficha-info";

    const montagens =

        Array.isArray(lure.montagens)

            ? lure.montagens.join(", ")

            : "-";

    const profundidade =

        lure.profundidade

            ? lure.profundidade.descricao
            : "-";

    [

        ["Origem", lure.origem],

        ["Categoria", lure.categoria],

        ["Subcategoria", lure.subcategoria],

        ["Tipo", lure.tipo],

        ["Montagens", montagens],

        [

            "Peso",

            lure.peso

                ? `${lure.peso} g`
                : "-"

        ],

        [

            "Comprimento",

            lure.comprimento

                ? `${lure.comprimento} cm`
                : "-"

        ],

        [

            "Flutuação",

            lure.flutuacao ?? "-"

        ],

        [

            "Profundidade",

            profundidade

        ]

    ]

    .forEach(([label, value]) => {

        container.append(

            createInfoRow(

                label,

                value

            )

        );

    });

    return container;

};

/*=========================================================
Montagens
=========================================================*/
const renderMontagens = () => {

    const section =
        createSection("Montagens");

    const area =
        document.createElement("div");

    area.className =
        "ficha-tags";

    (lure.montagens ?? []).forEach(item => {

        area.append(

            createChip(item)

        );

    });

    section.append(area);

    return section;

};

/*=========================================================
Horários
=========================================================*/

const createRatingRow = (label, value) => {

    const row =
        document.createElement("div");

    row.className =
        "ficha-rating-row";

    const left =
        document.createElement("span");

    left.className =
        "ficha-rating-label";

    left.textContent =
        label;

    row.append(

        left,

        createBadge(
            value ?? 0
        )

    );

    return row;

};

const renderHorario = () => {

    const section =
        createSection("Horários");

    const horarios = [

        ["🌅 Amanhecer", "amanhecer"],
        ["☀️ Manhã", "manha"],
        ["🌤️ Tarde", "tarde"],
        ["🌙 Noite", "noite"]

    ];

    horarios.forEach(([titulo, chave]) => {

        section.append(

            createRatingRow(

                titulo,

                lure.horario?.[chave]

            )

        );

    });

    return section;

};

/*=========================================================
Água
=========================================================*/

const renderAgua = () => {

    const section =
        createSection("Condição da Água");

    const tipos = [

        ["💧 Água Limpa", "limpa"],
        ["🌤 Turva Leve", "turvaLeve"],
        ["🌊 Turva", "turva"]

    ];

    tipos.forEach(([titulo, chave]) => {

        section.append(

            createRatingRow(

                titulo,

                lure.agua?.[chave]

            )

        );

    });

    return section;

};

/*=========================================================
Estruturas
=========================================================*/

const renderEstruturas = () => {

    const section =
        createSection("Estruturas");

    const area =
        document.createElement("div");

    area.className =
        "ficha-tags";

    (lure.estruturas ?? []).forEach(item => {

        area.append(

            createChip(item)

        );

    });

    section.append(area);

    return section;

};

/*=========================================================
Trabalhos
=========================================================*/

const renderTrabalhos = () => {

    const section =
        createSection("Trabalhos");

    const area =
        document.createElement("div");

    area.className =
        "ficha-tags";

    (lure.trabalhos ?? []).forEach(item => {

        area.append(

            createChip(item)

        );

    });

    section.append(area);

    return section;

};
/*=========================================================
Espécies
=========================================================*/

const renderEspecies = () => {

    const section =
        createSection("Espécies");

    const area =
        document.createElement("div");

    area.className =
        "ficha-info";

    (lure.especies ?? []).forEach(especie => {

        area.append(

            createInfoRow(

                especie.nome,

                createStars(
                    especie.afinidade
                )

            )

        );

    });

    section.append(area);

    return section;

};

/*=========================================================
Estoque
=========================================================*/

const renderEstoque = () => {

    const section =
        createSection("Estoque");

    const estoque =

       window.Database
    .getStock()
    .filter(item =>
        item.isca === lure.id &&
        item.status !== "Baixada"
    );

    section.append(

        createInfoRow(

            "Quantidade",

            estoque.length

        )

    );

    if (!estoque.length) {

        return section;

    }

    const table =
        document.createElement("table");

    table.className =
        "ficha-table";

    const thead =
        document.createElement("thead");

    thead.innerHTML = `

        <tr>

            <th>Caixa</th>

            <th>Cor</th>

            <th>Status</th>

        </tr>

    `;

    table.append(thead);

    const tbody =
        document.createElement("tbody");

    estoque.forEach(item => {

        const tr =
            document.createElement("tr");

        const caixa =
            document.createElement("td");

        caixa.textContent =
            item.caixa ?? "-";

        const cor =
            document.createElement("td");

        cor.textContent =
            item.cor ?? "-";

        const status =
            document.createElement("td");

        status.style.textAlign =
            "center";

        const dot =
            document.createElement("span");

        dot.className =
            "status-dot";

        switch (item.status) {

            case "Ativa":
                dot.classList.add("status-ativa");
                break;

            case "Reserva":
                dot.classList.add("status-reserva");
                break;

            case "Manutenção":
                dot.classList.add("status-manutencao");
                break;

            case "Baixada":
                dot.classList.add("status-baixada");
                break;

        }

        dot.title =
            item.status;

        status.append(dot);

        tr.append(

            caixa,

            cor,

            status

        );

        tbody.append(tr);

    });

    table.append(tbody);

    section.append(table);

    return section;

};

/*=========================================================
Observações
=========================================================*/

const renderObservacoes = () => {

    const section =
        createSection("Observações");

    const texto =
        document.createElement("p");

    texto.className =
        "ficha-observacoes";

    texto.textContent =

        lure.observacoes ||

        "Nenhuma observação cadastrada.";

    section.append(texto);

    return section;

};

/*=========================================================
Ações
=========================================================*/

const createActionButton = (

    texto,

    classe,

    callback

) => {

    const button =
        document.createElement("button");

    button.className =
        classe;

    button.textContent =
        texto;

    button.onclick =
        callback;

    return button;

};

const renderActions = () => {

    const section =
        createSection("Ações");

    section.classList.add(
        "ficha-actions"
    );

    section.append(

        createActionButton(

            "⬅ Voltar ao Catálogo",

            "button",

            () => {

                window.Router.open(
                    "catalogo"
                );

            }

        )

    );

    return section;

};
/*=========================================================
Render da página
=========================================================*/

const render = ()=>{

    const root =
        document.querySelector("#app");

    if(!root){

        return;

    }

    if(!lure){

        root.innerHTML =

            "<h2>Isca não encontrada.</h2>";

        return;

    }

    const page =
        document.createElement("div");

    page.className =
        "ficha";

    const hero =
    document.createElement("section");

hero.className =
    "ficha-hero";

const left =
    document.createElement("div");

left.className =
    "ficha-left";

left.append(

    renderPhoto()

);

const right =
    document.createElement("div");

right.className =
    "ficha-right";

right.append(

    renderInfo()

);

const heroCard =
    document.createElement("section");

heroCard.className =
    "ficha-card";

heroCard.append(

    left,

    right

);

page.append(

    window.FishBook
        .Components
        .Navbar
        .create("catalogo"),

    renderHeader(),

    heroCard,

    renderMontagens(),

    renderHorario(),

    renderAgua(),

    renderEstruturas(),

    renderTrabalhos(),

    renderEspecies(),

    renderEstoque(),

    renderObservacoes(),

    renderActions()

);
    root.replaceChildren(page);

};

/*=========================================================
Página
=========================================================*/

const Ficha = {

    async open(id){

        loadLure(id);

        render();

    },

    async close(){

        document
            .querySelector("#app")
            ?.replaceChildren();

    }

};

window.FishBook =
    window.FishBook ?? {};

window.FishBook.Pages =
    window.FishBook.Pages ?? {};

window.FishBook.Pages.Ficha =
    Object.freeze(Ficha);

window.Router.register(
    "ficha",
    window.FishBook.Pages.Ficha
);

})();