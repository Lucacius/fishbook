/*
=========================================================
FishBook
Filter Group
Parte 1/3
=========================================================
*/

(() => {

"use strict";

/*=========================================================
Helpers
=========================================================*/

const createOption = (

    name,

    type,

    value,

    onChange

)=>{

    const label =
        document.createElement(
            "label"
        );

    label.className =
        "filter-option";

    const input =
        document.createElement(
            "input"
        );

    input.type =
        type;

    input.name =
        name;

    input.value =
        value;

        

input.addEventListener("mousedown", event => {



    if(

        input.checked

    ){

        event.preventDefault();

        input.checked = false;

        input.dispatchEvent(

            new Event(

                "change",

                { bubbles:false }

            )

        );

    }

});

input.addEventListener("change", () => {

    onChange();

});


    const text =
        document.createElement(
            "span"
        );

    text.textContent =
        value;

    label.append(

        input,

        text

    );

    return label;

};

/*=========================================================
Criação
=========================================================*/

const create = ({

    title,

    name,

    options,

    type = "radio",

    onChange

})=>{

    const card =
        document.createElement(
            "section"
        );

    card.className =
        "filter-group";

    const heading =
        document.createElement(
            "h3"
        );

    heading.className =
        "filter-title";

    heading.textContent =
        title;

    const container =
        document.createElement(
            "div"
        );

    container.className =
        "filter-options";

  options.forEach(item => {

    if (

        typeof item === "string"

    ) {

        container.append(

            createOption(

                name,

                type,

                item,

                onChange

            )

        );

        return;

    }

    const group =
        document.createElement("div");

    group.className =
        "filter-group-section";

    const list =
    document.createElement("div");

list.className =
    "filter-options";

item.options.forEach(option => {

    list.append(

        createOption(

            name,

            type,

            option,

            onChange

        )

    );

});

if(item.title !== "Todas"){

    const subtitle =
        document.createElement("h4");

    subtitle.className =
        "filter-group-subtitle";

    subtitle.textContent =
        item.title;

    group.append(

        subtitle,

        list

    );

}else{

    group.append(

        list

    );

}

    container.append(

        group

    );

});

    card.append(

        heading,

        container

    );

    return card;

};

/*=========================================================
Leitura
=========================================================*/

const getValue = name=>{

    const input =

        document.querySelector(

            `input[name="${name}"]:checked`

        );

    return input

        ? input.value

        : null;

};

const getValues = name=>

    [

        ...document.querySelectorAll(

            `input[name="${name}"]:checked`

        )

    ]

    .map(

        input=>

            input.value

    );

/*=========================================================
Exportação
=========================================================*/

window.FishBook =
    window.FishBook ?? {};

window.FishBook.Components =
    window.FishBook.Components ?? {};

window.FishBook.Components.FilterGroup =

    Object.freeze({

        create,

        getValue,

        getValues

    });

})();