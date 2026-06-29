const fs = require("fs");

const arquivo = "database/iscas.json";

const banco = JSON.parse(

    fs.readFileSync(

        arquivo,

        "utf8"

    )

);

banco.iscas.forEach(isca => {

    isca.foto = `${isca.id}.png`;

});

fs.writeFileSync(

    arquivo,

    JSON.stringify(

        banco,

        null,

        2

    ),

    "utf8"

);

console.log("Fotos atualizadas.");