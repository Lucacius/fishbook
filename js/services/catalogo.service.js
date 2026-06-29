/*
=========================================================
FishBook
Catalogo Service
=========================================================
*/

(() => {

"use strict";

const sortById = list =>

    [...list].sort(

        (a,b)=>

            a.id.localeCompare(

                b.id,

                "pt-BR",

                {

                    numeric:true

                }

            )

    );

const listar = (filters = {})=>{

    const texto =

        String(

            filters.texto ?? ""

        )

        .trim()

        .toLowerCase();

const origem =

    filters.origem ?? "";

const categoria =

    filters.categoria ?? "";

const subcategoria =

    filters.subcategoria ?? "";

const montagem =

    filters.montagem ?? "";

    return sortById(

        window.Database

            .getLures()

            .map(lure=>({

                ...lure,

                estoque:

                    window.Database

                        .getStockByLure(

                            lure.id

                        )

                        .filter(item=>

                            item.status !==

                            "Baixada"

                        )

                        .length

            }))

            .filter(lure=>{

       const pesquisa = [

    lure.id,

    lure.nome,

    lure.origem,

    lure.categoria,

    lure.subcategoria,

    ...(lure.montagens ?? [])

]

.filter(Boolean)

.join(" ")

.toLowerCase();

                .filter(Boolean)

                .join(" ")

                .toLowerCase();

                const okTexto =

                    !texto ||

                    pesquisa.includes(

                        texto

                    );

                const okOrigem =

    !origem ||

    lure.origem === origem;

const okCategoria =

    !categoria ||

    lure.categoria === categoria;

const okSubcategoria =

    !subcategoria ||

    lure.subcategoria === subcategoria;

const okMontagem =

    !montagem ||

    (lure.montagens ?? []).includes(montagem);

return (

    okTexto &&

    okOrigem &&

    okCategoria &&

    okSubcategoria &&

    okMontagem

);

            })

    );

};

const categorias = ()=>{

    return [

        ...window.Database

            .getCategories()

    ]

    .sort(

        (a,b)=>

            a.nome.localeCompare(

                b.nome,

                "pt-BR"

            )

    );

};

const CatalogoService =

    Object.freeze({

        listar,

        categorias

    });

window.FishBook =
    window.FishBook ?? {};

window.FishBook.Services =
    window.FishBook.Services ?? {};

window.FishBook.Services.CatalogoService =
    CatalogoService;

})();