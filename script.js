let carrito = [];

function agregarAlCarrito(nombre, precio, idCantidad) {
  const cantidad = parseInt(document.getElementById(idCantidad).value);

  if (isNaN(cantidad) || cantidad < 1) {
    alert("Cantidad inválida");
    return;
  }

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

  const numero = "3054328798"; // Cambia a tu número
  const mensaje = carrito.map(p => `- ${p.nombre} x${p.cantidad}: $${(p.precio * p.cantidad).toLocaleString()}`).join('\n');
  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
  const textoFinal = `Hola, quiero comprar:\n${mensaje}\n\nTotal: $${total.toLocaleString()}`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(textoFinal)}`;

  window.open(url, "_blank");
}

function mostrarSeccion(seccion) {
  const productos = document.getElementById('seccion-productos');
  const carrito = document.getElementById('seccion-carrito');

  if (seccion === 'productos') {
    productos.style.display = 'flex';
    carrito.style.display = 'none';
  } else {
    productos.style.display = 'none';
    carrito.style.display = 'block';
    actualizarCarrito(); // refresca el carrito por si hubo cambios
  }
}

function mostrarMensajeExito() {
  const mensaje = document.getElementById('mensaje-exito');
  mensaje.textContent = "✅ Producto agregado con éxito. Haz clic en 'Ver carrito' para revisar tu compra.";
  mensaje.style.display = 'block';

  // Reiniciar animación
  mensaje.classList.remove("toast");
  void mensaje.offsetWidth; // reinicia animación
  mensaje.classList.add("toast");

  // Ocultar después de 3 segundos
  setTimeout(() => {
    mensaje.style.display = 'none';
  }, 3000);
}

function agregarAlCarrito(nombre, precio, idCantidad) {
  const cantidad = parseInt(document.getElementById(idCantidad).value);

  if (isNaN(cantidad) || cantidad < 1) {
    alert("Cantidad inválida");
    return;
  }

  const existente = carrito.find(item => item.nombre === nombre);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, cantidad });
  }

  actualizarCarrito();
  mostrarMensajeExito(); // <-- AQUI
}
