/*modo escuro e lupa de pesquisa*/
const body = document.querySelector("body"),
    nav = document.querySelector("nav"),
    modeToggle = document.querySelector(".dark-light"),
    searchToggle = document.querySelector(".searchToggle");
 
modeToggle.addEventListener("click", () => {
    modeToggle.classList.toggle("active");
    body.classList.toggle("dark");
});

/*js code to toggle search box*/
/* CORREÇÃO: Corrigido de "clik" para "click" */
searchToggle.addEventListener("click", () => {
    searchToggle.classList.toggle("active");
});
