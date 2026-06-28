/*
 * Componente reutilizável para filtros e metadados compactos.
 * Nesta etapa ele é apenas visual e não executa ações.
 */

(() => {
  "use strict";

  const Chip = Object.freeze({
    create({ label, icon = "" }) {
      const chip = document.createElement("span");
      chip.className = "fb-chip";

      if (icon) {
        const iconElement = document.createElement("span");
        iconElement.className = "fb-chip__icon";
        iconElement.setAttribute("aria-hidden", "true");
        iconElement.textContent = icon;
        chip.append(iconElement);
      }

      const labelElement = document.createElement("span");
      labelElement.textContent = label;
      chip.append(labelElement);

      return chip;
    },
  });

  window.FishBook.Components.Chip = Chip;
})();
