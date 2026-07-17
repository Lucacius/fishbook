/*
=========================================================
FishBook
Modal
=========================================================
*/

(() => {

"use strict";

const open = ({
    title = "",
    content = ""
} = {}) => {

    close();

    const overlay =
        document.createElement("div");

    overlay.className =
        "fb-modal-overlay";

    const modal =
        document.createElement("div");

    modal.className =
        "fb-modal";

    const header =
        document.createElement("div");

    header.className =
        "fb-modal-header";

    const h2 =
        document.createElement("h2");

    h2.textContent =
        title;

    const closeButton =
        document.createElement("button");

    closeButton.type =
        "button";

    closeButton.className =
        "fb-modal-close";

    closeButton.textContent =
        "×";

    header.append(

        h2,

        closeButton

    );

    const body =
        document.createElement("div");

    body.className =
        "fb-modal-body";

    if (

        typeof content === "string"

    ) {

        body.innerHTML =
            content;

    }

    else {

        body.append(content);

    }

    modal.append(

        header,

        body

    );

    overlay.append(

        modal

    );

    document.body.append(

        overlay

    );

    closeButton.onclick =
        close;

    overlay.onclick = event => {

        if (

            event.target === overlay

        ) {

            close();

        }

    };

};

const close = () => {

    document

        .querySelector(

            ".fb-modal-overlay"

        )

        ?.remove();

};

window.FishBook =
    window.FishBook ?? {};

window.FishBook.Components =
    window.FishBook.Components ?? {};

window.FishBook.Components.Modal =

    Object.freeze({

        open,

        close

    });

})();