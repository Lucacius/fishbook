/*
=========================================================
FishBook
Página Estoque
=========================================================
*/

(() => {

"use strict";

const render = () => `

<section class="page">

    <header class="page-header">

        <h1>Estoque</h1>

    </header>

    <div class="empty-state">

        <h2>Em breve</h2>

        <p>

            O gerenciamento de estoque será disponibilizado em uma próxima versão do FishBook.

        </p>

    </div>

</section>

`;

window.FishBook =
    window.FishBook ?? {};

window.FishBook.Pages =
    window.FishBook.Pages ?? {};

window.FishBook.Pages.Estoque = Object.freeze({

    render

});

})();