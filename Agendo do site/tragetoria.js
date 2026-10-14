
"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       MENU MOBILE
    ========================================== */

    const menu = document.getElementById("menu");
    const menuToggle = document.getElementById("menuToggle");

    function fecharMenu() {
        if (!menu || !menuToggle) return;

        menu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
    }

    if (menu && menuToggle) {
        menuToggle.addEventListener("click", function () {
            const aberto = menu.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(aberto));
            menuToggle.setAttribute(
                "aria-label",
                aberto ? "Fechar menu" : "Abrir menu"
            );
            menuToggle.textContent = aberto ? "✕" : "☰";
        });

        menu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", fecharMenu);
        });

        menu.querySelectorAll("button").forEach(function (button) {
            if (button.id !== "openLogin") {
                button.addEventListener("click", fecharMenu);
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") fecharMenu();
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 1000) fecharMenu();
        });
    }

    /* ==========================================
       TEMA CLARO / ESCURO
    ========================================== */

    const modeToggle = document.getElementById("modeToggle");

    function atualizarBotaoTema() {
        if (!modeToggle) return;

        const escuro = document.body.classList.contains("dark");
        modeToggle.textContent = escuro ? "☀️" : "🌙";
        modeToggle.setAttribute(
            "aria-label",
            escuro ? "Ativar tema claro" : "Ativar tema escuro"
        );
    }

    if (modeToggle) {
        modeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark");
            atualizarBotaoTema();
        });

        atualizarBotaoTema();
    }

    /* ==========================================
       BUSCA DE PLANTAS
    ========================================== */

    const searchToggle = document.getElementById("searchToggle");
    const searchContainer = document.getElementById("searchContainer");
    const campoBusca = document.getElementById("buscaPlantas");
    const resultadosBusca = document.getElementById("resultadosBusca");
    const mensagemBusca = document.getElementById("mensagemBusca");
    const cardsPlantas = Array.from(
        document.querySelectorAll(".planta-card")
    );

    function normalizar(texto) {
        return texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    if (searchToggle && searchContainer) {
        searchToggle.addEventListener("click", function () {
            const vaiAbrir = searchContainer.hidden;

            searchContainer.hidden = !vaiAbrir;
            searchToggle.setAttribute(
                "aria-label",
                vaiAbrir ? "Ocultar busca" : "Mostrar busca"
            );

            if (vaiAbrir && campoBusca) campoBusca.focus();
        });
    }

    if (campoBusca) {
        campoBusca.addEventListener("input", function () {
            const termo = normalizar(campoBusca.value);
            let quantidadeVisivel = 0;

            cardsPlantas.forEach(function (card) {
                const nome = normalizar(
                    card.dataset.nome || card.textContent
                );

                const corresponde = nome.includes(termo);
                card.hidden = !corresponde;

                if (corresponde) quantidadeVisivel++;
            });

            if (mensagemBusca) {
                mensagemBusca.hidden =
                    termo.length === 0 || quantidadeVisivel > 0;
            }

            if (resultadosBusca) {
                resultadosBusca.replaceChildren();

                if (termo.length > 0) {
                    cardsPlantas.forEach(function (card) {
                        const nome = card.dataset.nome || "";
                        if (normalizar(nome).includes(termo)) {
                            const resultado = document.createElement("a");
                            resultado.className = "resultado-busca";
                            resultado.href = "#TiposPlantas";
                            resultado.textContent = nome;

                            resultado.addEventListener("click", function () {
                                campoBusca.value = nome;
                                cardsPlantas.forEach(function (item) {
                                    item.hidden = item !== card;
                                });

                                if (mensagemBusca) {
                                    mensagemBusca.hidden = true;
                                }

                                if (searchContainer) {
                                    searchContainer.hidden = true;
                                }
                            });

                            resultadosBusca.appendChild(resultado);
                        }
                    });
                }
            }
        });
    }

    /* ==========================================
       MODAL DE LOGIN
    ========================================== */

    const loginModal = document.getElementById("loginModal");
    const openLogin = document.getElementById("openLogin");
    const closeLogin = document.getElementById("closeLogin");
    const loginForm = document.getElementById("loginForm");
    const statusLogin = document.getElementById("statusLogin");

    if (openLogin && loginModal) {
        openLogin.addEventListener("click", function () {
            fecharMenu();

            if (typeof loginModal.showModal === "function") {
                loginModal.showModal();
            }
        });
    }

    if (closeLogin && loginModal) {
        closeLogin.addEventListener("click", function () {
            loginModal.close();
        });
    }

    if (loginModal) {
        loginModal.addEventListener("click", function (event) {
            if (event.target === loginModal) {
                loginModal.close();
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!loginForm.reportValidity()) return;

            if (statusLogin) {
                statusLogin.textContent =
                    "Formulário validado. A autenticação precisa de um servidor.";
            }
        });
    }

    /* ==========================================
       FORMULÁRIO DE CONTATO
    ========================================== */

    const contactForm = document.getElementById("contactForm");
    const statusContato = document.getElementById("statusContato");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            if (statusContato) {
                statusContato.textContent =
                    "Campos validados. Para enviar a mensagem, conecte o formulário a um serviço ou servidor.";
            }
        });
    }

    /* ==========================================
       ANO AUTOMÁTICO NO RODAPÉ
    ========================================== */

    const anoAtual = document.getElementById("anoAtual");

    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }

});
