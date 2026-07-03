/*
 * Página Catálogo
 * Responsável apenas pela interface do catálogo.
 */

(() => {
  "use strict";

let filters = {

    texto: "",

    origem: "",

    categoria: "",

    subcategoria: "",

    montagem: "",

   };

  let listContainer;

  let contadorElement;

  /* ========================= */

const renderHeader = () => {

    const header =
        document.createElement("header");

    header.className =
        "catalogo-header";

    const title =
        document.createElement("h1");

    title.textContent =
        "📖 Catálogo";

    const subtitle =
        document.createElement("p");

    contadorElement =
        subtitle;

    header.append(

        title,

        subtitle

    );

    return header;

};

  /* ========================= */

const renderFilters = () => {

    const wrapper =
        document.createElement("section");

    wrapper.className =
        "catalogo-filters";

    const createSelect = (

        placeholder,

        values,

        field

    ) => {

        const select =
            document.createElement("select");

        select.className =
            "input";

        const first =
            document.createElement("option");

        first.value = "";

        first.textContent =
            placeholder;

        select.append(first);

        values.forEach(value => {

            const option =
                document.createElement("option");

            option.value =
                value;

            option.textContent =
                value;

            select.append(option);

        });

        select.addEventListener(

            "change",

            e => {

                filters[field] =
                    e.target.value;

                updateList();

            }

        );

        return select;

    };

    const input =
        document.createElement("input");

    input.type =
        "search";

    input.className =
        "input";

    input.placeholder =
        "Pesquisar...";

    input.addEventListener(

        "input",

        e => {

            filters.texto =
                e.target.value;

            updateList();

        }

    );

    wrapper.append(

        input,

        createSelect(

            "Todas as origens",

            window.Database.getOrigins(),

            "origem"

        ),

        createSelect(

            "Todas as categorias",

            window.Database.getCategoriesList(),

            "categoria"

        ),

        createSelect(

            "Todas as subcategorias",

            window.Database.getSubcategories(),

            "subcategoria"

        ),

        createSelect(

            "Todas as montagens",

            window.Database.getMontagens(),

            "montagem"

        )

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

            const total =
    window.Database.getLures().length;

contadorElement.textContent =
    `${list.length} de ${total} iscas encontradas`;

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

    window.FishBook
        .Components
        .Navbar
        .create("catalogo"),

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

    origem: "",

    categoria: "",

    subcategoria: "",

    montagem: ""

};

      render();

    },

    async close() {

      document
        .querySelector("#app")
        ?.replaceChildren();

    }

  });

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