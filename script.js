let carrito = [];

function agregarAlCarrito(nombre, precio, idCantidad) {
  const cantidad = parseInt(document.getElementById(idCantidad).value);

  if (isNaN(cantidad) || cantidad < 1) {
    alert("Cantidad inválida");
    return;
  }

  // Si ya existe el producto en el carrito, solo actualiza la cantidad
  const existente = carrito.find(item => item.nombre === nombre);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, cantidad });
  }

  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalEl = document.getElementById('total');
  lista.innerHTML = '';
  let total = 0;

  carrito.forEach((item) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    const li = document.createElement('li');
    li.textContent = `${item.nombre} x${item.cantidad} - $${subtotal.toLocaleString()}`;
    lista.appendChild(li);
  });

  totalEl.textContent = `Total: $${total.toLocaleString()}`;
}

function enviarPedidoWhatsApp() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  const numero = "573001234567"; // Reemplaza con TU número
  const mensaje = carrito.map(p => `- ${p.nombre} x${p.cantidad}: $${(p.precio * p.cantidad).toLocaleString()}`).join('\n');
  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
  const textoFinal = `Hola, quiero comprar:\n${mensaje}\n\nTotal: $${total.toLocaleString()}`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(textoFinal)}`;

  window.open(url, "_blank");
}
