const contenedor = document.getElementById("contenedor-productos");
const btnAgregar = document.getElementById("agregar");
const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");
const inputImagen = document.getElementById("imagen");

let productos = [];

// 🔹 Cargar productos desde JSON
fetch("products.json")
  .then(response => response.json())
  .then(datos => {
    productos = datos;
    renderProductos();
  })
  .catch(error => console.log("Error al cargar el JSON:", error));

// 🔹 Renderizar productos en pantalla
function renderProductos() {
  contenedor.innerHTML = "";
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.setAttribute("data-id", prod.id); // Usamos un atributo para identificar cada producto.

    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio}</p>
      <button class="ocultar">Ocultar</button>
    `;

    // 🔹 Evento para ocultar solo este producto
    div.querySelector(".ocultar").addEventListener("click", () => {
      div.style.display = 'none'; // Solo ocultamos el producto visualmente
    });

    contenedor.appendChild(div);
  });
}

// 🔹 Generar nuevo ID automático
function generarID() {
  return productos.length > 0
    ? Math.max(...productos.map(p => p.id)) + 1
    : 1;
}

// 🔹 Agregar nuevo producto
btnAgregar.addEventListener("click", () => {
  const nombre = inputNombre.value.trim();
  const precio = parseFloat(inputPrecio.value);
  const imagen = inputImagen.value.trim() || "https://picsum.photos/seed/default/200/200";

  if (!nombre || isNaN(precio)) {
    alert("Por favor ingresa nombre y precio válidos.");
    return;
  }

  const nuevoProducto = {
    id: generarID(),
    nombre,
    precio,
    imagen
  };

  productos.push(nuevoProducto);
  renderProductos();

  inputNombre.value = "";
  inputPrecio.value = "";
  inputImagen.value = "";
});
