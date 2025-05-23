document.getElementById('converteBtn').addEventListener('click', () => {
    const items = document.querySelectorAll('li');
    items.forEach(li => {
        switch (li.className) {
            case 'cama':
                li.textContent = '🛏️'; // símbolo para cama
                break;
            case 'guarda-roupa':
                li.textContent = '🚪'; // símbolo para guarda-roupa
                break;
            case 'armario':
                li.textContent = '🗄️'; // símbolo para armário
                break;
        }
    });
});

document.getElementById('converteBtn').addEventListener('click', () => {
    if (event.key === 'click') {
        desconverteBtn()
    }
});

function desconverteBtn() {
    const items = document.querySelectorAll('li');
    items.forEach(li => {
        switch (li.className) {
            case '🛏️':
                li.textContent = 'cama'; // símbolo para cama
                break;
            case 'guarda-roupa':
                li.textContent = '🚪'; // símbolo para guarda-roupa
                break;
            case 'armario':
                li.textContent = '🗄️'; // símbolo para armário
                break;
        }
    });
}
