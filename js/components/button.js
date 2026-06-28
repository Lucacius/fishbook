/*
 * Componente reutilizável de botão.
 * Centraliza estrutura, variantes e comportamento acessível.
 */

(() => {
  "use strict";

  const Button = Object.freeze({
    create({
      label,
      icon = "",
      type = "button",
      variant = "default",
      className = "",
      ariaLabel = "",
      onClick = null,
    }) {
      const button = document.createElement("button");
      button.type = type;
      button.className = `fb-button fb-button--${variant}`;

      if (className) {
        button.classList.add(...className.split(/\s+/).filter(Boolean));
      }

      if (ariaLabel) {
        button.setAttribute("aria-label", ariaLabel);
      }

      if (icon) {
        const iconElement = document.createElement("span");
        iconElement.className = "fb-button__icon";
        iconElement.setAttribute("aria-hidden", "true");
        iconElement.textContent = icon;
        button.append(iconElement);
      }

      const labelElement = document.createElement("span");
      labelElement.className = "fb-button__label";
      labelElement.textContent = label;
      button.append(labelElement);

      if (typeof onClick === "function") {
        button.addEventListener("click", onClick);
      }

      return button;
    },
  });

  window.FishBook.Components.Button = Button;
})();
