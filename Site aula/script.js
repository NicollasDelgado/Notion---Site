let cssEnabled = false;
let isConverted = false;

const emojiMap = {
    'cama': '🛏️',
    'guarda-roupa': '🚪',
    'armario': '🗄️'
};

function toggleCSS() {
    const cssLink = document.getElementById('main-css');
    const toggleBtn = document.getElementById('toggleCssBtn');
    const warning = document.getElementById('css-warning');

    if (!cssEnabled) {
        cssLink.disabled = false;
        document.body.classList.add('css-activation');
        if (warning) warning.remove();
        toggleBtn.textContent = '🎨 Desativar CSS';
        cssEnabled = true;
    } else {
        cssLink.disabled = true;

        if (!document.getElementById('css-warning')) {
            const warningDiv = document.createElement('div');
            warningDiv.id = 'css-warning';
            warningDiv.className = 'no-css-warning';
            warningDiv.textContent = '⚠️ CSS DESABILITADO - Você está vendo apenas HTML puro! ⚠️';
            document.body.insertBefore(warningDiv, document.body.firstChild);
        }

        toggleBtn.textContent = '🎨 Ativar CSS';
        cssEnabled = false;
    }
}

function convertToEmojis() {
    const items = document.querySelectorAll('li');

    items.forEach((li, index) => {
        setTimeout(() => {
            li.classList.add('buying-animation');

            setTimeout(() => {
                const emoji = emojiMap[li.className.replace(' buying-animation', '')];
                if (emoji) {
                    li.textContent = emoji;
                    li.classList.remove('buying-animation');
                    li.classList.add('converted');
                }
            }, 600);
        }, index * 200);
    });

    setTimeout(() => {
        document.getElementById('converteBtn').style.display = 'none';
        document.getElementById('resetBtn').style.display = 'inline-block';
        isConverted = true;
    }, items.length * 200 + 600);
}

function resetToOriginal() {
    const items = document.querySelectorAll('li');
    items.forEach(li => {
        const originalText = li.getAttribute('data-original');
        if (originalText) {
            li.textContent = originalText;
            li.classList.remove('converted', 'buying-animation');
        }
    });

    document.getElementById('converteBtn').style.display = 'inline-block';
    document.getElementById('resetBtn').style.display = 'none';
    isConverted = false;
}

// Eventos
document.getElementById('toggleCssBtn').addEventListener('click', toggleCSS);
