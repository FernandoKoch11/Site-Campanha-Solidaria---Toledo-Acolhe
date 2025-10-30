// Dados de imigrantes por país
const categorias = [
    { nome: "Venezuela", valor: 45, cor: "#ff7300" },
    { nome: "Haiti", valor: 15, cor: "#ffb347" },
    { nome: "Senegal/Bangladesh", valor: 5, cor: "#ffd700" },
    { nome: "Colombia", valor: 10, cor: "#66cdaa" },
    { nome: "Paraguai", valor: 25, cor: "#1e90ff" }
];

let canvas, ctx, centroX, centroY, raio;
let setores = [];
let setorAtivo = null;

// Função principal
function criarGraficoPizza() {
    canvas = document.getElementById("graficoPizza");
    ctx = canvas.getContext("2d");
    centroX = canvas.width / 2;
    centroY = canvas.height / 2;
    raio = 200;

    const total = categorias.reduce((s, cat) => s + cat.valor, 0);
    let anguloInicial = 0;

    setores = categorias.map(cat => {
        const proporcao = cat.valor / total;
        const anguloFinal = anguloInicial + proporcao * 2 * Math.PI;
        const setor = { ...cat, anguloInicial, anguloFinal };
        anguloInicial = anguloFinal;
        return setor;
    });

    desenharGrafico();
}

// Desenha todo o gráfico
function desenharGrafico() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setores.forEach((setor, i) => {
        desenharSetor(setor, i === setorAtivo ? 10 : 0);
    });
}

// Desenha cada setor individualmente
function desenharSetor(setor, destaque = 0) {
    const { anguloInicial, anguloFinal, cor, nome, valor } = setor;
    const anguloMeio = (anguloInicial + anguloFinal) / 2;

    // deslocamento se estiver com hover
    const deslocamento = destaque;
    const deslocX = Math.cos(anguloMeio) * deslocamento;
    const deslocY = Math.sin(anguloMeio) * deslocamento;

    ctx.beginPath();
    ctx.moveTo(centroX + deslocX, centroY + deslocY);
    ctx.arc(centroX + deslocX, centroY + deslocY, raio, anguloInicial, anguloFinal);
    ctx.closePath();

    // Efeito de brilho se hover
    const gradiente = ctx.createRadialGradient(centroX, centroY, raio * 0.3, centroX, centroY, raio);
    gradiente.addColorStop(0, destaque ? "white" : cor);
    gradiente.addColorStop(1, cor);

    ctx.fillStyle = gradiente;
    ctx.fill();

    // Porcentagem dentro do setor
    const total = categorias.reduce((s, c) => s + c.valor, 0);
    const percentual = ((valor / total) * 100).toFixed(1) + "%";
    const xTexto = centroX + Math.cos(anguloMeio) * (raio * 0.6);
    const yTexto = centroY + Math.sin(anguloMeio) * (raio * 0.6);
    ctx.fillStyle = "#000";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.fillText(percentual, xTexto + deslocX, yTexto + deslocY);

    // Linha e nome fora do círculo
    const xLinha1 = centroX + Math.cos(anguloMeio) * (raio + 10);
    const yLinha1 = centroY + Math.sin(anguloMeio) * (raio + 10);
    const xLinha2 = centroX + Math.cos(anguloMeio) * (raio + 30);
    const yLinha2 = centroY + Math.sin(anguloMeio) * (raio + 30);
    const alinhamento = Math.cos(anguloMeio) > 0 ? "left" : "right";

    // Linha
    ctx.beginPath();
    ctx.moveTo(xLinha1 + deslocX, yLinha1 + deslocY);
    ctx.lineTo(xLinha2 + deslocX, yLinha2 + deslocY);
    ctx.strokeStyle = cor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Bolinha
    ctx.beginPath();
    ctx.arc(xLinha1 + deslocX, yLinha1 + deslocY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = cor;
    ctx.fill();

    // Nome do país fora do círculo
    ctx.fillStyle = "#333";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = alinhamento;
    ctx.fillText(nome, xLinha2 + deslocX + (alinhamento === "left" ? 10 : -10), yLinha2 + deslocY + 4);
}

// Detecta o setor sobre o qual o mouse está
function detectarSetor(mouseX, mouseY) {
    const dx = mouseX - centroX;
    const dy = mouseY - centroY;
    const distancia = Math.sqrt(dx * dx + dy * dy);
    if (distancia > raio) return null;

    const angulo = Math.atan2(dy, dx);
    const anguloPositivo = angulo >= 0 ? angulo : 2 * Math.PI + angulo;

    return setores.findIndex(setor =>
        anguloPositivo >= setor.anguloInicial && anguloPositivo < setor.anguloFinal
    );
}

// Interatividade com hover
canvas?.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const index = detectarSetor(mouseX, mouseY);
    if (index !== setorAtivo) {
        setorAtivo = index;
        desenharGrafico();
    }
});

canvas?.addEventListener("mouseleave", () => {
    setorAtivo = null;
    desenharGrafico();
});

// Inicialização
window.addEventListener("DOMContentLoaded", criarGraficoPizza);
