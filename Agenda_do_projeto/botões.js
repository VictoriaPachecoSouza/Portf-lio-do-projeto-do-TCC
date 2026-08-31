function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
}

function openModal() {
    document.getElementById("loginModal").style.display = "flex";
}

window.onclick = function(event) {
    let modal = document.getElementById("loginModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function goToCart() {
    alert("Redirecionando para o carrinho...");
    window.location.href = "#";
}

