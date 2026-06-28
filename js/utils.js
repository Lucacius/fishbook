/*
 * Funções puras e reutilizáveis compartilhadas pelos demais módulos.
 * Nenhuma função deste arquivo depende da interface da aplicação.
 */

(() => {
  "use strict";

  /* Remove sinais diacríticos para permitir comparações mais tolerantes. */
  const removeAccents = (value = "") =>
    String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  /* Normaliza texto para buscas sem acentos, caixa ou espaços excedentes. */
  const normalizeText = (value = "") =>
    removeAccents(value).toLocaleLowerCase("pt-BR").trim();

  /* API pública das funções utilitárias. */
  const Utils = {
    generateId(prefix = "") {
      const randomId =
        globalThis.crypto?.randomUUID?.() ??
        `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

      return prefix ? `${prefix}-${randomId}` : randomId;
    },

    formatDate(value, options = {}) {
      const date = value instanceof Date ? value : new Date(value);

      if (Number.isNaN(date.getTime())) {
        return "";
      }

      return new Intl.DateTimeFormat("pt-BR", options).format(date);
    },

    removeAccents,

    normalizeText,

    includesText(value, searchTerm) {
      return normalizeText(value).includes(normalizeText(searchTerm));
    },

    compareStrings(firstValue, secondValue) {
      return String(firstValue ?? "").localeCompare(
        String(secondValue ?? ""),
        "pt-BR",
        { sensitivity: "base" },
      );
    },
  };

  window.Utils = Object.freeze(Utils);
})();
