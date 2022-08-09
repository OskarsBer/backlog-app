const dropDownWrap = document.querySelectorAll('.dd-wrap');

// Reset opened status menus
function resetToggle() {
  dropDownWrap.forEach((el) => {
    el.className = 'dd-wrap';
  });
}

document.addEventListener('click', (event) => {
  resetToggle();

  const menu = event.target;

  if (!menu.classList.contains('fa-bars')) return;

  const targetMenu = menu.closest('.wrapper').querySelector('.dd-wrap');

  targetMenu.classList.toggle('active');
});

// Validate blank inputs
const inputText = document.getElementById('inputText');
inputText.addEventListener('change', () => {
  if (inputText.value.trim().length === 0) {
    inputText.value = '';
  }
});
