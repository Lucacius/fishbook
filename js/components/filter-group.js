/*
=========================================================
FishBook
Filter Group
=========================================================
*/

(() => {

"use strict";

const create = ({

    title,

    name,

    options = [],

    type = "radio",

    onChange

})=>{

    const section =
        document.createElement("section");

    section.className =
        "filter-group";

    const heading =
        document.createElement("h2");

    heading.className =
        "filter-title";

    heading.textContent =
        title;

    section.append(heading);

    const content =
        document.createElement("div");

    content.className =
        "filter-options";

    options.forEach(option=>{

        const label =
            document.createElement("label");

        label.className =
            "filter-option";

        const input =
            document.createElement("input");

        input.type =
            type;

        input.name =
            name;

        input.value =
            option.value ?? "";

        input.checked =
            option.checked ?? false;

        input.addEventListener(

            "change",

            ()=>{

                if(

                    typeof onChange ===

                    "function"

                ){

                    onChange();

                }

            }

        );

        const span =
            document.createElement("span");

        span.textContent =
            option.label;

        label.append(

            input,

            span

        );

        content.append(label);

    });

    section.append(content);

    return section;

};

const getValue = name=>{

    const input =

        document.querySelector(

            `input[name="${name}"]:checked`

        );

    if(!input){

        return null;

    }

    return input.value === ""

        ? null

        : input.value;

};

const getValues = name=>{

    return [

        ...document.querySelectorAll(

            `input[name="${name}"]:checked`

        )

    ]

    .map(

        item=>item.value

    )

    .filter(Boolean);

};

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