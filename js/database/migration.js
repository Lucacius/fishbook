/*
=========================================================
FishBook
Migração Inicial JSON -> IndexedDB
=========================================================
*/

(() => {

"use strict";

const IDB =
    window.FishBook.Database.IDB;

/*=========================================================
Existe configuração?
=========================================================
*/

const migrated = ()=>{

    return new Promise(

        resolve=>{

            const request =

                IDB

                .store(

                    "configuracoes"

                )

                .get(

                    "migration"

                );

            request.onsuccess=()=>{

                resolve(

                    Boolean(

                        request.result

                    )

                );

            };

            request.onerror=()=>{

                resolve(false);

            };

        }

    );

};

/*=========================================================
Salvar configuração
=========================================================
*/

const setMigrated = ()=>{

    return new Promise(

        (resolve,reject)=>{

            const request =

                IDB

                .store(

                    "configuracoes",

                    "readwrite"

                )

                .put({

                    id:"migration",

                    completed:true,

                    date:

                        Date.now()

                });

            request.onsuccess=()=>

                resolve();

            request.onerror=()=>

                reject(

                    request.error

                );

        }

    );

};

/*=========================================================
Importar coleção
=========================================================
*/

const importCollection = (

    storeName,

    items

)=>{

    return new Promise(

        (resolve,reject)=>{

            const store =

                IDB.store(

                    storeName,

                    "readwrite"

                );

            items.forEach(item=>{

                store.put(item);

            });

            store.transaction.oncomplete=()=>

                resolve();

            store.transaction.onerror=()=>

                reject(

                    store.transaction.error

                );

        }

    );

};

/*=========================================================
Executar migração
=========================================================
*/

const execute = async ()=>{

    if(

        await migrated()

    ){

        console.info(

            "Banco já migrado."

        );

        return;

    }

    console.info(

        "Iniciando migração..."

    );

    await importCollection(

        "iscas",

        window.Database

            .getLures()

    );

    await importCollection(

        "estoque",

        window.Database

            .estoque()

    );

    await importCollection(

        "categorias",

        window.Database

            .categorias()

    );

    await importCollection(

        "especies",

        window.Database

            .especies()

    );

    await setMigrated();

    console.info(

        "Migração concluída."

    );

};

/*=========================================================
API
=========================================================
*/

window.FishBook.Database.Migration =

    Object.freeze({

        execute

    });

})();