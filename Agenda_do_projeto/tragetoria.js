/* ==========================================
   MENU MOBILE
========================================== */

function toggleMenu() {
    const menu = document.getElementById("menu");

    if (menu) {
        const menuAberto = menu.classList.toggle("active");

        const botaoMenu = document.getElementById("menuToggle");

        if (botaoMenu) {
            botaoMenu.setAttribute("aria-expanded", String(menuAberto));
            botaoMenu.setAttribute(
                "aria-label",
                menuAberto ? "Fechar menu" : "Abrir menu"
            );
            botaoMenu.textContent = menuAberto ? "✕" : "☰";
        }
    }
}


/* ==========================================
   MODAL DE LOGIN
========================================== */

function openModal() {
    const modal = document.getElementById("loginModal");

    if (modal) {
        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
    }
}

function closeModal() {
    const modal = document.getElementById("loginModal");

    if (modal) {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
    }
}


/* Fecha o modal ao clicar fora da caixa de login */

window.addEventListener("click", function (event) {
    const modal = document.getElementById("loginModal");

    if (modal && event.target === modal) {
        closeModal();
    }
});


/* ==========================================
   INICIALIZAÇÃO APÓS O CARREGAMENTO
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================
       ELEMENTOS
    ====================================== */

    const body = document.body;
    const nav = document.querySelector("nav");
    const modeToggle = document.querySelector(".dark-light");
    const searchToggle = document.querySelector(".searchToggle");
    const sidebarOpen = document.querySelector(".sidebarOpen");
    const sidebarClose = document.querySelector(".sidebarClose");

    const menu = document.getElementById("menu");
    const menuToggle = document.getElementById("menuToggle");


    /* ======================================
       MODO CLARO / ESCURO
    ====================================== */

    if (modeToggle) {
        let savedTheme = "light";

        try {
            savedTheme = localStorage.getItem("theme") || "light";
        } catch (error) {
            console.warn("Não foi possível acessar o tema salvo.");
        }

        const modoEscuroAtivado = savedTheme === "dark";

        body.classList.toggle("dark", modoEscuroAtivado);
        modeToggle.classList.toggle("active", modoEscuroAtivado);
        modeToggle.setAttribute("aria-pressed", String(modoEscuroAtivado));

        modeToggle.addEventListener("click", function (event) {
            event.stopPropagation();

            const modoEscuro = body.classList.toggle("dark");

            modeToggle.classList.toggle("active", modoEscuro);
            modeToggle.setAttribute("aria-pressed", String(modoEscuro));

            try {
                localStorage.setItem("theme", modoEscuro ? "dark" : "light");
            } catch (error) {
                console.warn("Não foi possível salvar a preferência de tema.");
            }
        });
    }


    /* ======================================
       PESQUISA
    ====================================== */

    if (searchToggle) {
        searchToggle.addEventListener("click", function (event) {
            event.stopPropagation();
            searchToggle.classList.toggle("active");
        });
    }


    /* ======================================
       MENU MOBILE
    ====================================== */

    const botaoAbrirMenu = menuToggle || sidebarOpen;
    const menuMobile = menu || nav;

    if (botaoAbrirMenu && menuMobile) {
        botaoAbrirMenu.addEventListener("click", function (event) {
            event.stopPropagation();

            const menuAberto = menuMobile.classList.toggle("active");

            botaoAbrirMenu.setAttribute("aria-expanded", String(menuAberto));
            botaoAbrirMenu.setAttribute(
                "aria-label",
                menuAberto ? "Fechar menu" : "Abrir menu"
            );

            if (botaoAbrirMenu.id === "menuToggle") {
                botaoAbrirMenu.textContent = menuAberto ? "✕" : "☰";
            }
        });

        /* Fecha o menu ao selecionar um link */

        menuMobile.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                menuMobile.classList.remove("active");
                botaoAbrirMenu.classList.remove("active");
                botaoAbrirMenu.setAttribute("aria-expanded", "false");
                botaoAbrirMenu.setAttribute("aria-label", "Abrir menu");

                if (botaoAbrirMenu.id === "menuToggle") {
                    botaoAbrirMenu.textContent = "☰";
                }
            });
        });
    }


    /* ======================================
       BOTÃO PARA FECHAR O MENU
    ====================================== */

    if (sidebarClose && menuMobile) {
        sidebarClose.addEventListener("click", function () {
            menuMobile.classList.remove("active");

            if (botaoAbrirMenu) {
                botaoAbrirMenu.setAttribute("aria-expanded", "false");
                botaoAbrirMenu.setAttribute("aria-label", "Abrir menu");

                if (botaoAbrirMenu.id === "menuToggle") {
                    botaoAbrirMenu.textContent = "☰";
                }
            }
        });
    }


    /* ======================================
       FECHAR MENU E PESQUISA AO CLICAR FORA
    ====================================== */

    body.addEventListener("click", function (event) {
        const elementoClicado = event.target;

        if (!(elementoClicado instanceof Element)) {
            return;
        }

        if (
            menuMobile &&
            !elementoClicado.closest("#menu") &&
            !elementoClicado.closest("nav") &&
            !elementoClicado.closest(".sidebarOpen") &&
            !elementoClicado.closest("#menuToggle")
        ) {
            menuMobile.classList.remove("active");

            if (botaoAbrirMenu) {
                botaoAbrirMenu.setAttribute("aria-expanded", "false");
                botaoAbrirMenu.setAttribute("aria-label", "Abrir menu");

                if (botaoAbrirMenu.id === "menuToggle") {
                    botaoAbrirMenu.textContent = "☰";
                }
            }
        }

        /* Fecha a pesquisa ao clicar fora */

        if (
            searchToggle &&
            !elementoClicado.closest(".searchBox") &&
            !elementoClicado.closest(".searchToggle")
        ) {
            searchToggle.classList.remove("active");
        }
    });


    /* ======================================
       KANBAN — ARRASTAR E SOLTAR
    ====================================== */

    const cards = document.querySelectorAll(".js-card");
    const columns = document.querySelectorAll(".js-column");

    cards.forEach(function (card) {
        card.addEventListener("dragstart", function () {
            card.classList.add("dragging");
        });

        card.addEventListener("dragend", function () {
            card.classList.remove("dragging");
        });
    });

    columns.forEach(function (column) {
        const cardsContainer = column.querySelector(".kanban-cards");

        column.addEventListener("dragover", function (event) {
            event.preventDefault();
            column.style.borderColor = "#2ea44f";
        });

        column.addEventListener("dragleave", function () {
            column.style.borderColor = "";
        });

        column.addEventListener("drop", function (event) {
            event.preventDefault();
            column.style.borderColor = "";

            const draggingCard = document.querySelector(".dragging");

            if (draggingCard && cardsContainer) {
                cardsContainer.appendChild(draggingCard);
            }
        });
    });

});


/* ==========================================
   BOTÃO VOLTAR
========================================== */

function voltarPagina() {
    window.history.back();
}