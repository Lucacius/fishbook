/*
 * Componente estrutural para agrupar conteúdos relacionados.
 * Permite título opcional e uma área interna configurável.
 */

(() => {
  "use strict";

  const Section = Object.freeze({
    create({
      title = "",
      ariaLabel = "",
      className = "",
      contentClassName = "",
      children = [],
    }) {
      const section = document.createElement("section");
      section.className = "fb-section";

      if (className) {
        section.classList.add(...className.split(/\s+/).filter(Boolean));
      }

      if (ariaLabel) {
        section.setAttribute("aria-label", ariaLabel);
      }

      if (title) {
        const heading = document.createElement("h2");
        heading.className = "fb-section__title";
        heading.textContent = title;
        section.append(heading);
      }

      const content = document.createElement("div");
      content.className = "fb-section__content";

      if (contentClassName) {
        content.classList.add(...contentClassName.split(/\s+/).filter(Boolean));
      }

      content.append(...children);
      section.append(content);
      return section;
    },
  });

  window.FishBook.Components.Section = Section;
})();
