/*
 * Página Catálogo
 * Responsável apenas pela interface do catálogo.
 */

(() => {
  "use strict";

  let filters = {
    texto: "",
    categoria: "",
  };

  let listContainer;

  /* ========================= */

const renderHeader = () => {

    const header =
        document.createElement("header");

    header.className =
        "catalogo-header";

    const voltar =
        document.createElement("button");

    voltar.className =
        "button button-secondary";

    voltar.textContent =
        "← Início";

    voltar.onclick = () => {

        window.Router.open("home");

    };

    const title =
        document.createElement("h1");

    title.textContent =
        "📖 Catálogo";

    const subtitle =
        document.createElement("p");

    subtitle.textContent =

        `${window.Database.getLures().length} iscas cadastradas`;

    header.append(

        voltar,

        title,

        subtitle

    );

    return header;

};

  /* ========================= */

  const renderFilters = () => {

    const wrapper = document.createElement("section");
    wrapper.className = "catalogo-filters";

    const input = document.createElement("input");

    input.type = "search";
    input.className = "input";
    input.placeholder = "Pesquisar...";

    input.addEventListener("input", e => {

      filters.texto = e.target.value;

      updateList();

    });

    const select = document.createElement("select");

    select.className = "input";

    select.innerHTML =
      `<option value="">Todas categorias</option>`;

    window.FishBook.Services.CatalogoService
    .categorias()
      .forEach(cat => {

        const option = document.createElement("option");

        option.value = cat.id;
        option.textContent = cat.nome;

        select.append(option);

      });

    select.addEventListener("change", e => {

      filters.categoria = e.target.value;

      updateList();

    });

    wrapper.append(
      input,
      select
    );

    return wrapper;

  };

  /* ========================= */

  const updateList = () => {

    listContainer.replaceChildren();

    const list =
    window.FishBook
        .Services
        .CatalogoService
        .listar(filters);

    list.forEach(lure => {

      listContainer.append(

        window.FishBook
          .Components
          .LureCard
          .create({

            lure,

            onClick() {

              window.Router.open(
    "ficha",
    lure.id
);

            }

          })

      );

    });

  };

  /* ========================= */

  const render = () => {

    const root =
      document.querySelector("#app");

    const page =
      document.createElement("div");

    page.className = "catalogo";

    page.append(

      renderHeader(),

      renderFilters()

    );

    listContainer =
      document.createElement("div");

    listContainer.id = "catalogo-list";

    page.append(listContainer);

    root.replaceChildren(page);

    updateList();

  };

  /* ========================= */

  const Catalogo = Object.freeze({

    async open() {

      filters = {

        texto: "",

        categoria: ""

      };

      render();

    },

    async close() {

      document
        .querySelector("#app")
        ?.replaceChildren();

    }

  });

page.append(

    window.FishBook
        .Components
        .Navbar
        .create("catalogo"),

    ...

);

  window.FishBook =
    window.FishBook ?? {};

  window.FishBook.Pages =
    window.FishBook.Pages ?? {};

  window.FishBook.Pages.Catalogo =
    Catalogo;

  window.Router.register(
    "catalogo",
    Catalogo
  );

})();