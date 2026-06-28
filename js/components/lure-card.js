/*
 * Componente visual de isca.
 * Utilizado pelo Catálogo e futuramente por outras telas.
 */

(() => {
  "use strict";

  const create = ({ lure, onClick = null }) => {
    const card = document.createElement("article");

    card.className = "lure-card";

    if (typeof onClick === "function") {
      card.tabIndex = 0;
      card.role = "button";

      card.addEventListener("click", onClick);

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      });
    }

    // Foto
    const image = document.createElement("img");

    image.className = "lure-card__image";
    image.alt = lure.nome;
    image.src = `assets/img/iscas/${lure.id}.jpg`;

    image.onerror = () => {
      image.onerror = null;
      image.src = "assets/img/iscas/semfoto.png";
    };

    // Conteúdo
    const content = document.createElement("div");
    content.className = "lure-card__content";

    // Código
    const code = document.createElement("span");
    code.className = "lure-card__code";
    code.textContent = lure.id;

    // Nome
    const title = document.createElement("h2");
    title.className = "lure-card__title";
    title.textContent = lure.nome;

// Badge
const badge =
  window.FishBook.Components.Badge.create({
    value: lure.eficiencia
  });

    // Informações
    const details = document.createElement("div");
    details.className = "lure-card__details";

    details.innerHTML = `
      <div><strong>Kit:</strong> ${lure.kit}</div>
      <div><strong>Família:</strong> ${lure.familia}</div>
      <div><strong>Peso:</strong> ${lure.peso} g</div>
    `;

    // Estoque
    const stock = document.createElement("div");
    stock.className = "lure-card__stock";
    stock.textContent = `📦 ${lure.estoque} unidade(s)`;

    content.append(
      code,
      title,
      badge,
      details,
      stock
    );

    card.append(
      image,
      content
    );

    return card;
  };

  window.FishBook = window.FishBook ?? {};
  window.FishBook.Components = window.FishBook.Components ?? {};
  window.FishBook.Components.LureCard = Object.freeze({
    create
  });

})();