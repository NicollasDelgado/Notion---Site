document.addEventListener("DOMContentLoaded", () => {
  let cssEnabled = false;
  let isConverted = false;

  // Mapeamento dos emojis para cada item
  const emojiMap = {
    'cama': '🛏️',
    'guarda-roupa': '🚪',
    'armario': '🗄️'
  };

  // Referências aos elementos do DOM
  const styleTag = document.getElementById('main-css'); // corrigido aqui
  const toggleCssBtn = document.getElementById('toggleCssBtn');
  const convertBtn = document.getElementById('converteBtn');
  const resetBtn = document.getElementById('resetBtn');

  // Função para mostrar aviso de CSS desativado
  function cssdesabilitado() {
    if (!document.getElementById('css-warning')) {
      const warningDiv = document.createElement('div');
      warningDiv.id = 'css-warning';
      warningDiv.className = 'no-css-warning';
      warningDiv.textContent = '⚠️ CSS DESABILITADO - Você está vendo apenas HTML puro! ⚠️';
      document.body.insertBefore(warningDiv, document.body.firstChild);
    }
  }

  // Remove aviso de CSS desativado
  function removeCssWarning() {
    const warning = document.getElementById('css-warning');
    if (warning) warning.remove();
  }

  // Alterna ativação/desativação do CSS
  function toggleCSS() {
    cssEnabled = !cssEnabled;

    if (cssEnabled) {
      styleTag.disabled = false;

      removeCssWarning();
      // Reinicia animação CSS
      document.body.classList.remove('css-activation');
      void document.body.offsetWidth; // Força reflow para reiniciar animação
      document.body.classList.add('css-activation');

      toggleCssBtn.textContent = '🚫 Desativar CSS';
      toggleCssBtn.title = 'Desativar estilo visual (CSS)';
    } else {
      styleTag.disabled = true;
      cssdesabilitado();

      toggleCssBtn.textContent = '🎨 Ativar CSS';
      toggleCssBtn.title = 'Ativar estilo visual (CSS)';
    }
  }

  // Converte itens da lista para emojis com animação
  function convertToEmojis() {
    if (isConverted) return;

    const items = document.querySelectorAll('li');
    convertBtn.disabled = true;

    items.forEach((li, index) => {
      setTimeout(() => {
        li.classList.add('buying-animation');

        setTimeout(() => {
          const className = li.className.split(' ')[0];
          const emoji = emojiMap[className];
          if (emoji) {
            li.textContent = emoji;
            li.classList.remove('buying-animation');
            li.classList.add('converted');
          }
        }, 600);
      }, index * 200);
    });

    setTimeout(() => {
      convertBtn.style.display = 'none';
      resetBtn.style.display = 'inline-block';
      isConverted = true;
    }, items.length * 200 + 600);
  }

  // Restaura os itens para o texto original
  function resetToOriginal() {
    const items = document.querySelectorAll('li');

    items.forEach(li => {
      const original = li.getAttribute('data-original');
      if (original) {
        li.textContent = original;
        li.classList.remove('converted', 'buying-animation');
      }
    });

    convertBtn.style.display = 'inline-block';
    convertBtn.disabled = false;
    resetBtn.style.display = 'none';
    isConverted = false;
  }

  // Adiciona os event listeners para os botões
  toggleCssBtn.addEventListener('click', toggleCSS);
  convertBtn.addEventListener('click', convertToEmojis);
  resetBtn.addEventListener('click', resetToOriginal);
});
