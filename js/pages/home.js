/*
 * Dashboard principal do FishBook.
 * Os cards são somente pontos de entrada e ainda não realizam navegação.
 */

(() => {
  "use strict";

  /* Módulos apresentados no Dashboard e suas ações provisórias. */
const DASHBOARD_MODULES = Object.freeze([
  {
    icon: "🎯",
    title: "Escolher Isca",
    route: "escolher",
  },
  {
    icon: "📖",
    title: "Catálogo",
    route: "catalogo",
  },
  {
    icon: "🐟",
    title: "Espécies",
    route: "especies",
  },
  {
    icon: "🎒",
    title: "Estoque",
    route: "estoque",
  },
  {
    icon: "📍",
    title: "Locais",
    route: "locais",
  },
  {
    icon: "📝",
    title: "Diário",
    route: "diario",
  },
  {
    icon: "📊",
    title: "Estatísticas",
    route: "estatisticas",
  },
  {
    icon: "⚙",
    title: "Configurações",
    route: "configuracoes",
  },
]);

  /* Constrói o cabeçalho de apresentação da aplicação. */
  const createHeader = () => {
    const { Badge } = window.FishBook.Components;
    const header = document.createElement("header");
    header.className = "dashboard-header";

    const brand = document.createElement("div");
    brand.className = "dashboard-brand";

    const fishIcon = document.createElement("span");
    fishIcon.className = "dashboard-brand__icon";
    fishIcon.setAttribute("aria-hidden", "true");
    fishIcon.textContent = "🐟";

    const title = document.createElement("h1");
    title.className = "dashboard-title";
title.textContent =

    window.FishBook

        .Config

        .Constantes

        .nomeSistema;
    brand.append(fishIcon, title);
brand.append(

    Badge.create({

        label:

            `v${window.FishBook.Config.Constantes.versao}`

    })

);
    const subtitle = document.createElement("p");
    subtitle.className = "dashboard-subtitle";
    subtitle.textContent = "Catálogo Inteligente das Iscas Artificiais do Lucas";

    header.append(brand, subtitle);
    return header;
  };


  /* Cria os cards sem acoplar funcionalidades futuras ao Dashboard. */
 const createCards = () => {
  const { Card } = window.FishBook.Components;

  return DASHBOARD_MODULES.map(({ icon, title, route }) =>
    Card.create({
      icon,
      title,
      ariaLabel: `Abrir ${title}`,
      onClick: () => {

        window.Router.open(route);

      },
    }),
  );
};

  /* Renderiza exclusivamente a Home dentro da raiz da aplicação. */
  const render = () => {
    const root = document.querySelector("#app");

    if (!root) {
      console.error('Home: elemento raiz "#app" não encontrado.');
      return false;
    }

    const { Section } = window.FishBook.Components;
    const dashboard = document.createElement("div");
    dashboard.className = "dashboard";

    const modulesSection = Section.create({
      ariaLabel: "Módulos do FishBook",
      className: "dashboard-modules",
      contentClassName: "dashboard-grid",
      children: createCards(),
    });

dashboard.append(

    window.FishBook
        .Components
        .Navbar
        .create("home"),

    createHeader(),

    modulesSection

);
    root.replaceChildren(dashboard);
    return true;
  };

  const Home = Object.freeze({
    async open() {
      return render();
    },

    async close() {
      document.querySelector("#app")?.replaceChildren();
    },
  });

  window.FishBook = window.FishBook ?? {};
  window.FishBook.Pages = window.FishBook.Pages ?? {};
  window.FishBook.Pages.Home = Home;
  window.Router.register("home", Home);
})();
