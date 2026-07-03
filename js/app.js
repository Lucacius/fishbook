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

      console.info("FishBook v0.4.42 iniciado com sucesso.");
      console.info("Banco carregado.");
      window.Validator.report(validationErrors);
    } catch (error) {
      console.error(
        "FishBook v0.4.42 encontrou uma falha inesperada na inicialização.",
        error,
      );
    }
  };
if ("serviceWorker" in navigator) {

    window.addEventListener("load", async () => {

        try {

            const registration =

                await navigator.serviceWorker.register(

                    "./service-worker.js"

                );

            console.info(

                "Service Worker registrado."

            );

            await registration.update();

            if (registration.waiting) {

                registration.waiting.postMessage(

                    "SKIP_WAITING"

                );

            }

            registration.addEventListener(

                "updatefound",

                () => {

                    const worker =

                        registration.installing;

                    if (!worker) {

                        return;

                    }

                    worker.addEventListener(

                        "statechange",

                        () => {

                            if (

                                worker.state === "installed" &&

                                navigator.serviceWorker.controller

                            ) {

                                worker.postMessage(

                                    "SKIP_WAITING"

                                );

                            }

                        }

                    );

                }

            );

            navigator.serviceWorker.addEventListener(

                "controllerchange",

                () => {

                    window.location.reload();

                }

            );

        }

        catch (error) {

            console.error(error);

        }

    });

}

  /* Aguarda a árvore do documento estar pronta antes de iniciar os módulos. */
  document.addEventListener("DOMContentLoaded", startApplication);
})();
