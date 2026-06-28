// ======================================================
// FishBook
// Router
// ======================================================

(() => {
    "use strict";

    const routes = new Map();

    let currentPage = null;

    let started = false;

    const register = (name, page) => {

        routes.set(name, page);

    };

    const start = () => {

        started = true;

    };

    const open = async (name, params = null) => {

        if (!started) {

            console.warn(
                "Router ainda não foi iniciado."
            );

        }

        const nextPage = routes.get(name);

        if (!nextPage) {

            console.error(
                `Página "${name}" não encontrada.`
            );

            return false;

        }

        if (
            currentPage &&
            typeof currentPage.close === "function"
        ) {

            await currentPage.close();

        }

        currentPage = nextPage;

        if (
            typeof nextPage.open === "function"
        ) {

            await nextPage.open(params);

        }

        return true;

    };

    const close = async () => {

        if (
            currentPage &&
            typeof currentPage.close === "function"
        ) {

            await currentPage.close();

        }

        currentPage = null;

    };

    window.Router = {

        register,

        start,

        open,

        close,

        get current() {

            return currentPage;

        }

    };

})();