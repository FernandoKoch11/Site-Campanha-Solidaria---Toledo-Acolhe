async function carregarDoadores() {
    const response = await fetch('../dados/doadores.csv');
    const texto = await response.text();
    const linhas = texto.trim().split('\n');
    const ranking = document.querySelector('.ranking-list');
    ranking.innerHTML = ''; // limpa conteúdo anterior

    // Mapeia doadores apenas com nome e fichas
    const doadores = linhas.slice(1).map((linha, index) => {
        const [nome, fichasStr] = linha.split(',');
        const fichas = parseInt(fichasStr);
        return { nome, fichas, id: `doador-${index}` };
    });

    const totalFichas = doadores.reduce((acc, d) => acc + d.fichas, 0);

    // Calcula porcentagem e ordena doadores do maior para o menor
    doadores.forEach(d => {
        d.porcentagem = ((d.fichas / totalFichas) * 100).toFixed(1);
    });
    doadores.sort((a, b) => b.fichas - a.fichas);

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
        `;
        ranking.appendChild(li);
    });
}

window.addEventListener('DOMContentLoaded', carregarDoadores);
