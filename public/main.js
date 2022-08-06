let dropDownWrap = document.querySelectorAll('.dd-wrap');


document.addEventListener('click', function(event) {
  resetToggle();

  let menu = event.target;

  if(!menu.classList.contains('fa-bars')) return;

  let targetMenu = menu.closest('.wrapper').querySelector('.dd-wrap')

  targetMenu.classList.toggle('active');
})

// Reset opened status menus
function resetToggle() {
  dropDownWrap.forEach(el => {
    el.className = 'dd-wrap';
  })
}

// Validate blank inputs
const inputText = document.getElementById('inputText')
inputText.addEventListener('change', () => {
  if(inputText.value.trim().length === 0) {
    inputText.value = '';
  }
})

// Update status
function updateStatus() {
  document.querySelectorAll('.a-parent').submit();
}