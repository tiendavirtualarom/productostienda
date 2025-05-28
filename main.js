// ========== FILTRAR POR CATEGORÍA ==========
function filterCategory(category, event) {
  const sections = document.querySelectorAll('.category-section');
  const buttons = document.querySelectorAll('.category-btn');

  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  if (category === 'all') {
    sections.forEach(section => section.style.display = 'block');
  } else {
    sections.forEach(section => {
      section.style.display = section.dataset.category === category ? 'block' : 'none';
    });
  }
}

// ========== BÚSQUEDA ==========
function searchProducts() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const productCards = document.querySelectorAll('.product-card');
  const sections = document.querySelectorAll('.category-section');

  if (searchTerm === '') {
    productCards.forEach(card => card.style.display = 'block');
    sections.forEach(section => section.style.display = 'block');
    return;
  }

  let hasResults = false;

  sections.forEach(section => {
    const sectionCards = section.querySelectorAll('.product-card');
    let sectionHasResults = false;

    sectionCards.forEach(card => {
      const productName = card.querySelector('.product-name').textContent.toLowerCase();
      const productDesc = card.querySelector('.product-description').textContent.toLowerCase();

      if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
        card.style.display = 'block';
        sectionHasResults = true;
        hasResults = true;
      } else {
        card.style.display = 'none';
      }
    });

    section.style.display = sectionHasResults ? 'block' : 'none';
  });

  if (!hasResults) {
    alert('No se encontraron productos que coincidan con tu búsqueda.');
  }
}

// ========== BOTÓN DE WHATSAPP ==========
function contactWhatsApp() {
  window.open('https://wa.me/573054328798', '_blank');
}

// ========== BUSCAR CON ENTER ==========
document.getElementById('searchInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    searchProducts();
  }
});
