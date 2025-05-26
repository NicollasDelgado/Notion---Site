document.addEventListener("DOMContentLoaded", () => {
  const emojiMap = {
    'cama': '🛏️',
    'guarda-roupa': '🚪',
    'armario': '🗄️',
    'armário': '🗄️',
    'sapato': '👞',
    'chave': '🔑',
    'livro': '📚',
    'mesa': '🪑'
  };

  const styleTag = document.getElementById('main-css');
  const toggleCssBtn = document.getElementById('toggleCssBtn');
  const convertBtn = document.getElementById('converteBtn');
  const resetBtn = document.getElementById('resetBtn');
  const addItemBtn = document.getElementById('addItemBtn');
  const newItemInput = document.getElementById('newItemInput');
  const itemList = document.getElementById('itemList');

  let cssEnabled = true;

  function toggleCSS() {
    cssEnabled = !cssEnabled;
    styleTag.disabled = !cssEnabled;
    toggleCssBtn.textContent = cssEnabled ? '🎨 Desativar CSS' : '🎨 Ativar CSS';
  }

  function updateButtonsState() {
    convertBtn.disabled = false;
    resetBtn.disabled = false;
  }

  function createListItem(text) {
    const li = document.createElement('li');
    li.setAttribute('data-original', text);
    li.setAttribute('data-converted', 'false');

    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'item-checkbox';
    checkbox.addEventListener('change', updateButtonsState);

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(' ' + text));
    li.appendChild(label);

    return li;
  }

  function addItem() {
    const text = newItemInput.value.trim();
    if (!text) {
      alert('Por favor, digite o nome do item.');
      return;
    }
    const li = createListItem(text);
    itemList.appendChild(li);
    newItemInput.value = '';
    updateButtonsState();
  }

  function convertItemToEmoji(li) {
    return new Promise(resolve => {
      const originalText = li.getAttribute('data-original');
      const lowerText = originalText.toLowerCase();
      const emoji = emojiMap[lowerText];

      li.innerHTML = emoji || originalText;
      li.setAttribute('data-converted', 'true');
      resolve();
    });
  }

  function restoreItemFromEmoji(li) {
    return new Promise(resolve => {
      const originalText = li.getAttribute('data-original');
      li.innerHTML = '';

      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'item-checkbox';
      checkbox.addEventListener('change', updateButtonsState);

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(' ' + originalText));
      li.appendChild(label);

      li.setAttribute('data-converted', 'false');
      resolve();
    });
  }

  async function buyItems() {
    const selected = Array.from(itemList.querySelectorAll('.item-checkbox:checked')).map(cb => cb.closest('li'));
    const targets = selected.length > 0
      ? selected.filter(li => li.getAttribute('data-converted') === 'false')
      : Array.from(itemList.children).filter(li => li.getAttribute('data-converted') === 'false');

    for (const li of targets) {
      await convertItemToEmoji(li);
    }
  }

  async function sellItems() {
    const selected = Array.from(itemList.querySelectorAll('.item-checkbox:checked')).map(cb => cb.closest('li'));
    const targets = selected.length > 0
      ? selected.filter(li => li.getAttribute('data-converted') === 'true')
      : Array.from(itemList.children).filter(li => li.getAttribute('data-converted') === 'true');

    for (const li of targets) {
      await restoreItemFromEmoji(li);
    }
  }

  // Event Listeners
  toggleCssBtn.addEventListener('click', toggleCSS);
  convertBtn.addEventListener('click', buyItems);
  resetBtn.addEventListener('click', sellItems);
  addItemBtn.addEventListener('click', addItem);
  newItemInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') addItem();
  });
  itemList.addEventListener('change', e => {
    if (e.target.classList.contains('item-checkbox')) {
      updateButtonsState();
    }
  });

  toggleCSS();
});
