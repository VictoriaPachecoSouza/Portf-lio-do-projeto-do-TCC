/* ==========================================

   MENU MOBILE

========================================== */
 
function toggleMenu() {

    const menu = document.getElementById("menu");
 
    if (menu) {

        menu.classList.toggle("active");

    }

}
 
 
/* ==========================================

   MODAL DE LOGIN

========================================== */
 
function openModal() {
 
    const modal = document.getElementById("loginModal");
 
    if (modal) {

        modal.style.display = "flex";

    }

}
 
 
window.addEventListener("click", function(event) {
 
    const modal = document.getElementById("loginModal");
 
    if (modal && event.target === modal) {

        modal.style.display = "none";

    }
 
});
 
 
/* ==========================================

   TUDO APÓS O CARREGAMENTO DA PÁGINA

========================================== */
 
document.addEventListener("DOMContentLoaded", () => {
 
 
    /* ======================================

       ELEMENTOS

    ====================================== */
 
    const body = document.body;
 
    const nav = document.querySelector("nav");
 
    const modeToggle = document.querySelector(".dark-light");
 
    const searchToggle = document.querySelector(".searchToggle");
 
    const sidebarOpen = document.querySelector(".sidebarOpen");
 
    const sidebarClose = document.querySelector(".sidebarClose");
 
 
    /* ======================================

       MODO ESCURO

    ====================================== */
 
    if (modeToggle) {
 
        // Verifica se existe tema salvo

        const savedTheme = localStorage.getItem("theme");
 
        // Se o usuário já escolheu dark

        if (savedTheme === "dark") {
 
            body.classList.add("dark");
 
            modeToggle.classList.add("active");
 
        } else {
 
            body.classList.remove("dark");
 
            modeToggle.classList.remove("active");
 
        }
 
 
        // Clique no botão Lua/Sol

        modeToggle.addEventListener("click", (event) => {
 
            event.stopPropagation();
 
            body.classList.toggle("dark");
 
            modeToggle.classList.toggle("active");
 
 
            // Salva preferência

            if (body.classList.contains("dark")) {
 
                localStorage.setItem("theme", "dark");
 
            } else {
 
                localStorage.setItem("theme", "light");
 
            }
 
        });
 
    }
 
 
    /* ======================================

       PESQUISA

    ====================================== */
 
    if (searchToggle) {
 
        searchToggle.addEventListener("click", (event) => {
 
            event.stopPropagation();
 
            searchToggle.classList.toggle("active");
 
        });
 
    }
 
 
    /* ======================================

       MENU MOBILE

    ====================================== */
 
    if (sidebarOpen && nav) {
 
        sidebarOpen.addEventListener("click", (event) => {
 
            event.stopPropagation();
 
            nav.classList.add("active");
 
        });
 
    }
 
 
    if (sidebarClose && nav) {
 
        sidebarClose.addEventListener("click", () => {
 
            nav.classList.remove("active");
 
        });
 
    }
 
 
    /* ======================================

       FECHAR MENU AO CLICAR FORA

    ====================================== */
 
    body.addEventListener("click", (event) => {
 
        const clickedElement = event.target;
 
 
        if (

            nav &&

            !clickedElement.closest(".menu") &&

            !clickedElement.closest(".sidebarOpen")

        ) {
 
            nav.classList.remove("active");
 
        }
 
 
        // Fecha pesquisa ao clicar fora

        if (

            searchToggle &&

            !clickedElement.closest(".searchBox") &&

            !clickedElement.closest(".searchToggle")

        ) {
 
            searchToggle.classList.remove("active");
 
        }
 
    });
 
 
    /* ======================================

       KANBAN - DRAG AND DROP

    ====================================== */
 
    const cards = document.querySelectorAll(".js-card");
 
    const columns = document.querySelectorAll(".js-column");
 
 
    cards.forEach(card => {
 
        card.addEventListener("dragstart", () => {
 
            card.classList.add("dragging");
 
        });
 
 
        card.addEventListener("dragend", () => {
 
            card.classList.remove("dragging");
 
        });
 
    });
 
 
    columns.forEach(column => {
 
        const cardsContainer =

            column.querySelector(".kanban-cards");
 
 
        column.addEventListener("dragover", (event) => {
 
            event.preventDefault();
 
            column.style.borderColor = "#2ea44f";
 
        });
 
 
        column.addEventListener("dragleave", () => {
 
            column.style.borderColor = "";
 
        });
 
 
        column.addEventListener("drop", () => {
 
            column.style.borderColor = "";
 
            const draggingCard =

                document.querySelector(".dragging");
 
 
            if (draggingCard && cardsContainer) {
 
                cardsContainer.appendChild(draggingCard);
 
            }
 
        });
 
    });
 
});

 