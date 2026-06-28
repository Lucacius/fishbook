/*
 * Ponto de entrada e orquestração da infraestrutura do FishBook.
 * A inicialização não renderiza telas nem altera o conteúdo do documento.
 */

(() => {
  "use strict";

window.FishBook = window.FishBook ?? {};

window.FishBook.Config = window.FishBook.Config ?? {};

window.FishBook.Components = window.FishBook.Components ?? {};

window.FishBook.Services = window.FishBook.Services ?? {};

window.FishBook.Pages = window.FishBook.Pages ?? {};

  /* Executa o fluxo principal sem interromper a aplicação em caso de falha. */
  const startApplication = async () => {
    try {
      await window.Database.load();
      const validationErrors = window.Validator.validate(window.Database);

      window.Router.start();
      await window.Router.open("home");

      console.info("FishBook v1.0 iniciado com sucesso.");
      console.info("Banco carregado.");
      window.Validator.report(validationErrors);
    } catch (error) {
      console.error(
        "FishBook v1.0 encontrou uma falha inesperada na inicialização.",
        error,
      );
    }
  };
if(

    "serviceWorker"

    in navigator

){

    window.addEventListener(

        "load",

        ()=>{

            navigator

                .serviceWorker

                .register(

                    "./service-worker.js"

                )

                .then(()=>{

                    console.info(

                        "Service Worker registrado."

                    );

                })

                .catch(error=>{

                    console.error(

                        error

                    );

                });

        }

    );

}

  /* Aguarda a árvore do documento estar pronta antes de iniciar os módulos. */
  document.addEventListener("DOMContentLoaded", startApplication);
})();
