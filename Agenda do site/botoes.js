
const monthYear = document.getElementById("month-year");
const daysContainer = document.getElementById("days");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let date = new Date();

function render() {
  date.setDate(1);
  const month = date.getMonth();
  const year = date.getFullYear();

  monthYear.textContent = date.toLocaleString("pt-BR", { month: "long", year: "numeric" });

  // Simples gerador de dias (apenas números para exemplo)
  daysContainer.innerHTML = "";
  for (let i = 1; i <= 31; i++) {
    daysContainer.innerHTML += `<div class="day">${i}</div>`;
  }
}

prevBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  render();
});

nextBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  render();
});

render();



