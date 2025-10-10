    async function carregarDoadores() {
        const response = await fetch('../dados/doadores.csv');
        const texto = await response.text();
        const linhas = texto.trim().split('\n');
        const ranking = document.querySelector('.ranking-list');
        ranking.innerHTML = ''; // limpa conteúdo anterior

        linhas.slice(1).forEach((linha, index) => {
            const [nome, fichas, itens] = linha.split(',');
            const id = `doador-${index}`;

            const li = document.createElement('li');
            li.innerHTML = `<strong>${nome}</strong> – ${fichas} fichas
                <div class="doacao-detalhes" id="${id}">
                    <p>${itens.replace(/"/g, '')}</p>
                </div>`;
            li.onclick = () => mostrarDoacao(id);
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