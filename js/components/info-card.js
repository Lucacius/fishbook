/*
 * Componente de card interativo.
 * Reaproveita o botão base para preservar semântica e acesso por teclado.
 */

(() => {
  "use strict";

  const Card = Object.freeze({
    create({ title, icon, ariaLabel = "", onClick = null }) {
      return window.FishBook.Components.Button.create({
        label: title,
        icon,
        variant: "card",
        className: "fb-card",
        ariaLabel: ariaLabel || title,
        onClick,
      });
    },
  });

  window.FishBook.Components.Card = Card;
})();
