// Dados fictícios de doações por categoria
const categorias = [
    { nome: "Venezuela", valor: Math.floor(Math.random() * 100) + 1 },
    { nome: "Haiti", valor: Math.floor(Math.random() * 100) + 1 },
    { nome: "Senegal", valor: Math.floor(Math.random() * 100) + 1 },
    { nome: "Bolívia", valor: Math.floor(Math.random() * 100) + 1 },
    { nome: "Outros", valor: Math.floor(Math.random() * 100) + 1 }
];

// Função para criar barras dinamicamente
function criarGrafico() {
    const container = document.querySelector(".grafico-barras");
    container.innerHTML = ""; // Limpa conteúdo anterior

    categorias.forEach(cat => {
        const barra = document.createElement("div");
        barra.classList.add("barra");
        barra.style.setProperty("--valor", `${cat.valor}%`);
        barra.textContent = cat.nome;
        container.appendChild(barra);
    });
}

// Executa ao carregar a página
window.addEventListener("DOMContentLoaded", criarGrafico);