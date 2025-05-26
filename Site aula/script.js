let isConverted = false;
let cssEnabled = false; // Começa desabilitado

// Mapear classes para emojis
const emojiMap = {
    'cama': '🛏️',
    'guarda-roupa': '🚪',
    'armario': '🗄️'
};

// Desabilitar CSS no início
window.addEventListener('DOMContentLoaded', function () {
    const styleElements = document.querySelectorAll('style');
    styleElements.forEach(style => {
        style.disabled = true;
    });

    // Adicionar aviso inicial
    const warning = document.createElement('div');
    warning.style.cssText = 'background: #ff6b6b; color: white; padding: 10px; text-align: center; font-weight: bold; margin: 10px 0;';
    warning.id = 'css-warning';
    warning.innerHTML = '⚠️ CSS DESABILITADO - Você está vendo apenas HTML puro! ⚠️';
    document.body.insertBefore(warning, document.body.firstChild);

    // Definir texto inicial do botão
    document.getElementById('toggleCssBtn').textContent = '🎨 Ativar CSS';
});

// Função para alternar CSS
function toggleCSS() {
    const styleElements = document.querySelectorAll('style');
    const toggleBtn = document.getElementById('toggleCssBtn');

    if (!cssEnabled) {
        // Habilitar CSS com animação
        styleElements.forEach(style => {
            style.disabled = false;
        });

        // Adicionar classe de animação ao body
        document.body.classList.add('css-activation');

        // Remover classe após animação
        setTimeout(() => {
            document.body.classList.remove('css-activation');
        }, 1500);

        toggleBtn.textContent = '🎨 Desativar CSS';

        // Remover aviso
        const warning = document.getElementById('css-warning');
        if (warning) {
            warning.remove();
        }

        cssEnabled = true;
    } else {
        // Desabilitar CSS
        styleElements.forEach(style => {
            style.disabled = true;
        });
        toggleBtn.textContent = '🎨 Ativar CSS';

        // Adicionar aviso visual
        const warning = document.createElement('div');
        warning.style.cssText = 'background: #ff6b6b; color: white; padding: 10px; text-align: center; font-weight: bold; margin: 10px 0;';
        warning.id = 'css-warning';
        warning.innerHTML = '⚠️ CSS DESABILITADO - Você está vendo apenas HTML puro! ⚠️';
        document.body.insertBefore(warning, document.body.firstChild);

        cssEnabled = false;
    }
}

// Função para converter para emojis com animação
function convertToEmojis() {
    const items = document.querySelectorAll('li');

    items.forEach((li, index) => {
        // Adicionar animação de compra primeiro
        setTimeout(() => {
            li.classList.add('buying-animation');

            // Após a animação de compra, converter para emoji
            setTimeout(() => {
                const emoji = emojiMap[li.className.replace(' buying-animation', '')];
                if (emoji) {
                    li.textContent = emoji;
                    li.classList.remove('buying-animation');
                    li.classList.add('converted');
                }
            }, 600);
        }, index * 200); // Delay sequencial para cada item
    });

    // Trocar visibilidade dos botões após todas as animações
    setTimeout(() => {
        document.getElementById('converteBtn').style.display = 'none';
        document.getElementById('resetBtn').style.display = 'inline-block';
        isConverted = true;
    }, items.length * 200 + 600);
}

// Função para voltar ao texto original
function resetToOriginal() {
    const items = document.querySelectorAll('li');
    items.forEach(li => {
        const originalText = li.getAttribute('data-original');
        if (originalText) {
            li.textContent = originalText;
            li.classList.remove('converted', 'buying-animation');
        }
    });

    // Trocar visibilidade dos botões
    document.getElementById('converteBtn').style.display = 'inline-block';
    document.getElementById('resetBtn').style.display = 'none';
    isConverted = false;
}

// Event listeners
document.getElementById('toggleCssBtn').addEventListener('click', toggleCSS);
document.getElementById('converteBtn').addEventListener('click', convertToEmojis);
document.getElementById('resetBtn').addEventListener('click', resetToOriginal);
