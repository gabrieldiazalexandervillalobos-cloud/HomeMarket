/* ==== NAVEGACIÓN DE SECCIONES ==== */
const links = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("main section");

links.forEach(link => {
  link.addEventListener("click", () => {
    const sectionId = link.dataset.section;
    sections.forEach(sec => sec.classList.remove("active"));
    links.forEach(l => l.classList.remove("active"));
    document.getElementById(sectionId).classList.add("active");
    link.classList.add("active");
  });
});

/* ==== MENÚ HAMBURGUESA ==== */
const hamburger = document.getElementById("hamburger");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("show");
});
/* ==== CARRITO DE COMPRAS ==== */
const listaCarrito = document.getElementById("listaCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
renderCarrito();
document.querySelectorAll(".btn-agregar").forEach(btn => {
    btn.addEventListener("click", () => {
      const nombre = btn.dataset.nombre;
      const precio = parseFloat(btn.dataset.precio);
      carrito.push({nombre, precio});
      guardarCarrito();
      renderCarrito();
   // Feedback visual
   btn.textContent = "✔ Agregado";
   btn.disabled = true;
   setTimeout(() => {
     btn.textContent = "Agregar";
     btn.disabled = false;
   }, 1500);
 });
});

vaciarCarrito.addEventListener("click", () => {
 carrito = [];
 guardarCarrito();
 renderCarrito();
});

function renderCarrito() {
    if (!listaCarrito || !totalCarrito) return;
  
    listaCarrito.innerHTML = "";
    let total = 0;
  
    carrito.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
  
      const eliminar = document.createElement("button");
      eliminar.textContent = "Eliminar";
      eliminar.addEventListener("click", () => {
        carrito.splice(index, 1);
        guardarCarrito();
        renderCarrito();
      });
  
      li.appendChild(eliminar);
      listaCarrito.appendChild(li);
  
      total += item.precio;
    });
  
    totalCarrito.textContent = total.toFixed(2);
    actualizarContador();
  }
  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  function actualizarContador() {
    if (contadorCarrito) {
      contadorCarrito.textContent = carrito.length;
    }
  }
  /* ==== FORMULARIO DE SUSCRIPCIÓN ==== */
const formSuscripcion = document.getElementById("formSuscripcion");
const msgSuscripcion = document.getElementById("msgSuscripcion");

formSuscripcion.addEventListener("submit", e => {
  e.preventDefault();
  msgSuscripcion.textContent = "✅ ¡Gracias por suscribirte!";
  formSuscripcion.reset();
});

/* ==== FILTRO DE PRODUCTOS ==== */
const filtroInput = document.getElementById("filtroProductos");
filtroInput.addEventListener("input", () => {
  const term = filtroInput.value.toLowerCase();
  document.querySelectorAll(".catalog-card").forEach(card => {
    const texto = card.innerText.toLowerCase();
    card.style.display = texto.includes(term) ? "block" : "none";
  });
});
/* ==== BUSCADORES POR SECCIÓN ==== */
document.querySelectorAll('.buscador-seccion').forEach(input => {
    input.addEventListener('input', () => {
      const termino = input.value.toLowerCase();
      const seccion = input.closest('section');
      const tarjetas = seccion.querySelectorAll('.catalog-card');
      tarjetas.forEach(card => {
        const contenido = card.innerText.toLowerCase();
        card.style.display = contenido.includes(termino) ? 'block' : 'none';
      });
    });
  });
  /* ==== CARRUSEL AUTOMÁTICO ==== */
let slideIndex = 0;
function showSlides() {
  const slides = document.querySelectorAll(".slides");
  slides.forEach(s => s.style.display = "none");
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 4000); // 4 segundos por slide
}
showSlides();
/* ==== AGREGAR PRODUCTO AL CARRITO ====
   (El código de agregar ya está implementado arriba en btn-agregar) */

/* ==== VACIAR CARRITO COMPLETAMENTE ==== */
vaciarCarrito?.addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    renderCarrito();
  });
  /* ==== RENDERIZAR CARRITO EN PANTALLA ====
   (El código de renderCarrito ya está implementado arriba) */

/* ==== ACTUALIZAR CONTADOR DEL ICONO DE CARRITO ====
   (La función de actualizarContador ya está implementada arriba) */

/* ==== AGREGAR PRODUCTO AL CARRITO (ADICIONAL) ==== */
const botonesAgregar = document.querySelectorAll(".btn-agregar");
botonesAgregar.forEach(btn => {
  btn.addEventListener("click", () => {
    const nombre = btn.dataset.nombre;
    const precio = parseFloat(btn.dataset.precio);

    carrito.push({ nombre, precio });
    guardarCarrito();
    renderCarrito();
  });
});
/* ==== VALIDAR FORMULARIO DE SUSCRIPCIÓN CON MENSAJES ==== */
const form = document.getElementById('formSuscripcion');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar el envío del formulario
// Obtener los valores de los campos
const nombre = document.getElementById('nombreSuscripcion').value;
const apellido = document.getElementById('ApellidoSuscripcion').value;
const correo = document.getElementById('correoSuscripcion').value;
const contraseña = document.getElementById('contraseñaSuscripcion').value;
const plan = document.querySelector('input[name="plan"]:checked')?.value;
 // Validar que los campos no estén vacíos
 if (!nombre || !apellido || !correo || !contraseña || !plan) {
    msgSuscripcion.textContent = 'Por favor, completa todos los campos.';
    msgSuscripcion.style.color = 'red';
    return;
  }
// Mostrar un mensaje de éxito
msgSuscripcion.textContent = `Gracias por suscribirte, ${nombre}! Te has suscrito al plan: ${plan}.`;
msgSuscripcion.style.color = 'green';

// Limpiar el formulario
form.reset();
});
document.getElementById('searchForm').addEventListener('submit', function(e){
    e.preventDefault();
    const query = document.getElementById('searchInput').value.toLowerCase();
    // Aquí podrías filtrar tus productos/destinos según la palabra
    console.log("Buscando:", query);
  });




  