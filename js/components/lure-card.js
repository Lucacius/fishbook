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
    image.alt =

    lure.nome ??

    "Isca";

image.src = `assets/iscas/${lure.id}.png`;

image.onerror = () => {

    image.onerror = null;

    image.src = "assets/iscas/semfoto.png";

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
value: lure.eficiencia ?? 0
  });

    // Informações
    const details = document.createElement("div");
    details.className = "lure-card__details";

   const montagens =

    Array.isArray(lure.montagens)

        ? lure.montagens.join(" • ")

        : "-";

const peso =

    lure.peso

        ? `${lure.peso} g`

        : "-";

details.innerHTML = `

    <div>

        <strong>${lure.categoria}</strong>

    </div>

    <div>

        ${lure.subcategoria ?? "-"}

    </div>

    <div>

        ${peso}

    </div>

    <div>

        ${montagens}

    </div>

`;

    // Estoque
    const stock = document.createElement("div");
    stock.className = "lure-card__stock";
 const quantidade =

    window.Database

        .getStock()

        .filter(item =>

            item.isca === lure.id &&

            item.status !== "Baixada"

        )

        .length;

stock.textContent =

    `📦 ${quantidade} un.`;

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