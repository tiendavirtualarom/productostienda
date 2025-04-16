let carrito = [];

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalEl = document.getElementById('total');
  lista.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    total += item.precio;
    const li = document.createElement('li');
    li.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;
    lista.appendChild(li);
  });

  totalEl.textContent = `Total: $${total.toLocaleString()}`;
}

function enviarPedidoWhatsApp() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  const numero = "3054328798"; // Reemplaza con TU número de WhatsApp
  const mensaje = carrito.map(p => `- ${p.nombre}: $${p.precio.toLocaleString()}`).join('\n');
  const total = carrito.reduce((sum, p) => sum + p.precio, 0);
  const textoFinal = `Hola, quiero comprar:\n${mensaje}\n\nTotal: $${total.toLocaleString()}`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(textoFinal)}`;

  window.open(url, "_blank");
}
