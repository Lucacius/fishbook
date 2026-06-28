/*
 * Validação estrutural das coleções JSON carregadas em memória.
 * Os erros são acumulados e nunca interrompem a inicialização da aplicação.
 */

(() => {
  "use strict";

  /* Relaciona nomes de campos de referência às respectivas coleções. */
  const COLLECTION_ALIASES = Object.freeze({
    categoria: "categorias",
    categorias: "categorias",
    especie: "especies",
    especies: "especies",
    isca: "iscas",
    iscas: "iscas",
    estoque: "estoque",
  });

  let errors = [];

  /* Cria uma ocorrência com formato único para facilitar a leitura no console. */
  const addError = (type, file, message, details = {}) => {
    errors.push({ type, file, message, details });
  };

  /* Aceita coleções em array ou nos invólucros "data" e "items". */
  const getRecords = (value) => {
    if (Array.isArray(value)) {
      return value;
    }

    if (value && Array.isArray(value.data)) {
      return value.data;
    }

    if (value && Array.isArray(value.items)) {
      return value.items;
    }

    return [];
  };

  /* Transforma o nome de um campo como "categoria_id" em "categorias". */
  const getReferencedCollection = (field) => {
    const match = String(field).match(/^(.+?)(?:_ids?|Ids?|ID|IDs)$/);

    if (!match) {
      return null;
    }

    const baseName = match[1].replace(/_+$/, "").toLowerCase();
    return COLLECTION_ALIASES[baseName] ?? `${baseName}s`;
  };

  /* Importa para o relatório as falhas detectadas durante a leitura dos arquivos. */
  const validateLoadErrors = (database) => {
    database.errors().forEach((error) => {
      addError(error.type, error.file, error.message, {
        cause: error.cause ?? null,
      });
    });
  };

  /* Procura IDs repetidos dentro de cada coleção. */
  const validateDuplicateIds = (database) => {
    database.entries().forEach(([collectionName, collection]) => {
      const knownIds = new Set();

      getRecords(collection).forEach((record, index) => {
        if (!record || !Object.hasOwn(record, "id")) {
          return;
        }

        const id = String(record.id);

        if (knownIds.has(id)) {
          addError(
            "duplicate-id",
            `${collectionName}.json`,
            `ID duplicado "${id}" na coleção "${collectionName}".`,
            { id, index },
          );
        }

        knownIds.add(id);
      });
    });
  };

  /* Verifica referências terminadas em "Id", "_id", "Ids" ou "_ids". */
  const validateReferences = (database) => {
    const idsByCollection = new Map(
      database.entries().map(([name, collection]) => [
        name,
        new Set(
          getRecords(collection)
            .filter((record) => record && Object.hasOwn(record, "id"))
            .map((record) => String(record.id)),
        ),
      ]),
    );

    database.entries().forEach(([collectionName, collection]) => {
      getRecords(collection).forEach((record, index) => {
        if (!record || typeof record !== "object") {
          return;
        }

        Object.entries(record).forEach(([field, rawValue]) => {
          const targetCollection = getReferencedCollection(field);

          if (!targetCollection || rawValue === null || rawValue === "") {
            return;
          }

          const targetIds = idsByCollection.get(targetCollection);
          const references = Array.isArray(rawValue) ? rawValue : [rawValue];

          references.forEach((reference) => {
            if (!targetIds || !targetIds.has(String(reference))) {
              addError(
                "missing-reference",
                `${collectionName}.json`,
                `Referência inexistente em "${field}": "${reference}".`,
                {
                  collection: collectionName,
                  index,
                  targetCollection,
                },
              );
            }
          });
        });
      });
    });
  };

  /* API pública de validação e apresentação organizada do relatório. */
  const Validator = {
    validate(database = window.Database) {
      errors = [];

      try {
        validateLoadErrors(database);
        validateDuplicateIds(database);
        validateReferences(database);
      } catch (error) {
        addError(
          "validator",
          "validator.js",
          "Ocorreu uma falha interna durante a validação.",
          { cause: error },
        );
      }

      return this.errors();
    },

    errors() {
      return errors.map((error) => ({ ...error }));
    },

    report(validationErrors = errors) {
      if (validationErrors.length > 0) {
        console.group("FishBook — relatório de validação");
        validationErrors.forEach((error, index) => {
          console.error(
            `${index + 1}. [${error.type}] ${error.file}: ${error.message}`,
            error.details,
          );
        });
        console.groupEnd();
      }

      console.info(
        `${validationErrors.length} ${
          validationErrors.length === 1 ? "erro encontrado" : "erros encontrados"
        }.`,
      );
    },
  };

  window.Validator = Object.freeze(Validator);
})();
