# FishBook v1.0.0

Aplicação web responsiva construída com HTML5, CSS3, JavaScript ES6 e JSON,
sem frameworks ou bibliotecas de interface.

## Estado atual

A Etapa 3 adiciona o Dashboard definitivo sobre a infraestrutura existente.
A Home apresenta sete módulos em cards responsivos, mas suas ações ainda apenas
escrevem mensagens no console. Catálogo, fichas, estoque, dados e demais telas
não foram implementados.

## Arquitetura

```text
FishBook_v1/
|-- assets/
|-- css/
|-- database/
|   |-- README.md
|   |-- manifest.json
|   |-- iscas.json
|   |-- categorias.json
|   |-- estoque.json
|   `-- especies.json
|-- js/
|   |-- app.js
|   |-- database.js
|   |-- validator.js
|   |-- utils.js
|   |-- router.js
|   |-- components/
|   |   |-- index.js
|   |   |-- button.js
|   |   |-- card.js
|   |   |-- badge.js
|   |   |-- chip.js
|   |   `-- section.js
|   |-- services/
|   |   `-- index.js
|   `-- pages/
|       `-- home.js
`-- index.html
```

## Responsabilidades

- `js/database.js`: descobre as coleções pelo manifesto, carrega os JSONs com
  `async/await` e mantém os dados em memória.
- `js/validator.js`: reúne falhas de leitura, JSON inválido, IDs duplicados e
  referências inexistentes, sem interromper a aplicação.
- `js/utils.js`: oferece funções independentes para IDs, datas e textos.
- `js/router.js`: registra páginas, abre rotas e controla a página atual.
- `js/components/`: botões, cards, badges, chips e seções reutilizáveis.
- `js/services/`: ponto de registro dos futuros serviços.
- `js/pages/home.js`: registra e renderiza exclusivamente o Dashboard.
- `js/app.js`: executa a inicialização depois de `DOMContentLoaded`.
- `database/manifest.json`: informa ao navegador quais coleções JSON carregar.

## Ordem de inicialização

O HTML carrega os scripts nesta ordem: banco, validador, utilitários, roteador,
componentes, serviços, páginas e, por último, a aplicação.

## Execução

O carregamento de JSON com `fetch` exige um servidor HTTP local. Na pasta
`FishBook_v1`, execute um servidor estático de sua preferência e abra o endereço
informado no navegador. O Dashboard será aberto automaticamente e a
infraestrutura continuará registrando no console:

```text
FishBook v1.0 iniciado com sucesso.
Banco carregado.
0 erros encontrados.
```
