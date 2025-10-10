async function carregarDoadores() {
    const response = await fetch('../dados/doadores.csv');
    const texto = await response.text();
    const linhas = texto.trim().split('\n');
    const ranking = document.querySelector('.ranking-list');
    ranking.innerHTML = ''; // limpa conteúdo anterior

    const doadores = linhas.slice(1).map((linha, index) => {
        const partes = linha.split(',');
        const nome = partes[0];
        const fichas = parseInt(partes[1]);
        const itens = partes.slice(2).join(',').replace(/"/g, '');
        return { nome, fichas, itens, id: `doador-${index}` };
    });

    const totalFichas = doadores.reduce((acc, d) => acc + d.fichas, 0);

    // Calcula porcentagem e ordena doadores do maior para o menor
    doadores.forEach(d => {
        d.porcentagem = ((d.fichas / totalFichas) * 100).toFixed(1);
    });
    doadores.sort((a, b) => b.fichas - a.fichas); // ordena por fichas (ou porcentagem)

    doadores.forEach(doador => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="barra-container">
                <div class="barra-fundo">
                    <div class="barra-preenchida" style="width: ${doador.porcentagem}%"></div>
                    <div class="barra-texto">
                        <strong>${doador.nome}</strong> – ${doador.fichas} fichas (${doador.porcentagem}%)
                    </div>
                </div>
            </div>
            <div class="doacao-detalhes" id="${doador.id}">
                <p>${doador.itens}</p>
            </div>
        `;
        li.onclick = () => mostrarDoacao(doador.id);
        ranking.appendChild(li);
    });
}

function mostrarDoacao(id) {
    document.querySelectorAll('.doacao-detalhes').forEach(div => {
        div.style.display = 'none';
    });
    const selecionado = document.getElementById(id);
    if (selecionado) {
        selecionado.style.display = 'block';
    }
}

window.addEventListener('DOMContentLoaded', carregarDoadores);
