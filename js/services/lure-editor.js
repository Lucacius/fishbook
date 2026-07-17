(() => {

"use strict";

const nextId = (categoria, subcategoria) => {

    const categoriaCode =
        Database.getCode(
            "categorias",
            categoria
        )?.codigo;

    const subcategoriaCode =
        Database.getCode(
            "subcategorias",
            subcategoria
        )?.codigo;

    if (!categoriaCode)
        throw new Error(
            `Categoria "${categoria}" não encontrada.`
        );

    if (!subcategoriaCode)
        throw new Error(
            `Subcategoria "${subcategoria}" não encontrada.`
        );

    const prefixo =
        `${categoriaCode}-${subcategoriaCode}-`;

    const ultimoNumero =

        Database.getLures()

            .filter(

                lure =>

                    lure.id.startsWith(prefixo)

            )

            .map(

                lure =>

                    Number(

                        lure.id.slice(prefixo.length)

                    )

            )

            .filter(

                Number.isFinite

            )

            .reduce(

                (maior, numero) =>

                    Math.max(maior, numero),

                0

            );

    return `${prefixo}${String(ultimoNumero + 1).padStart(3,"0")}`;

};

window.LureEditor = Object.freeze({

    nextId

});

})();