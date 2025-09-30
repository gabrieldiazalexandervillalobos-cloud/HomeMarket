/* ==== NAVEGACIÓN DE SECCIONES ==== */
const links = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("main section");

links.forEach(link => {
  link.addEventListener("click", () => {
    const sectionId = link.dataset.section;
    sections.forEach(sec => sec.classList.remove("active"));
    links.forEach(l => l.classList.remove("active"));
    const targetSection = document.getElementById(sectionId);
    if (targetSection) targetSection.classList.add("active");
    link.classList.add("active");
  });
});

/* ==== CARRITO DE COMPRAS ==== */
const listaCarrito = document.getElementById("listaCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador() {
  if (contadorCarrito) contadorCarrito.textContent = carrito.length;
}

function renderCarrito() {
  if (!listaCarrito || !totalCarrito) return;
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`

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

document.querySelectorAll(".btn-agregar").forEach(btn => {
  btn.addEventListener("click", () => {
    const nombre = btn.dataset.nombre;
    const precio = parseFloat(btn.dataset.precio);
    carrito.push({ nombre, precio });
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

vaciarCarrito?.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  renderCarrito();
});

// Inicializamos carrito al cargar la página
renderCarrito();

/* ==== FORMULARIO DE SUSCRIPCIÓN ==== */
const form = document.getElementById('formSuscripcion');
const msgSuscripcion = document.getElementById('msgSuscripcion');

form?.addEventListener('submit', function(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombreSuscripcion')?.value.trim();
  const apellido = document.getElementById('ApellidoSuscripcion')?.value.trim();
  const correo = document.getElementById('correoSuscripcion')?.value.trim();
  const contraseña = document.getElementById('contraseñaSuscripcion')?.value.trim();
  const plan = document.querySelector('input[name="plan"]:checked')?.value;

  if (!nombre || !apellido || !correo || !contraseña || !plan) {
    msgSuscripcion.textContent = 'Por favor, completa todos los campos.';
    msgSuscripcion.style.color = 'red';
    return;
  }

  msgSuscripcion.textContent =`¡Gracias por suscribirte, ${nombre}! Te has suscrito al plan: ${plan}`.
  msgSuscripcion.style.color = 'green';
  form.reset();
});

/* ==== FILTRO DE PRODUCTOS ==== */
const filtroInput = document.getElementById("filtroProductos");
filtroInput?.addEventListener("input", () => {
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
    if (!seccion) return;
    const tarjetas = seccion.querySelectorAll('.catalog-card');

    tarjetas.forEach(card => {
      const contenido = card.innerText.toLowerCase();
      card.style.display = contenido.includes(termino) ? 'block' : 'none';
    });
  });
});

/* ==== BUSCADORES NOTICIAS Y EVENTOS ==== */
const searchNews = document.getElementById('search-news');
searchNews?.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const cards = document.querySelectorAll('.noticia-card');
  
  cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const description = card.querySelector('p')?.textContent.toLowerCase() || '';
      card.style.display = (title.includes(query) || description.includes(query)) ? '' : 'none';
  });
});

const searchEvents = document.getElementById('search-events');
searchEvents?.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const cards = document.querySelectorAll('.evento-card');
  
  cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const description = card.querySelector('p')?.textContent.toLowerCase() || '';
      card.style.display = (title.includes(query) || description.includes(query)) ? '' : 'none';
  });
});

/* ==== BLOG / VER MÁS ==== */
const verMasBtn = document.getElementById('ver-mas');
const blogCards = document.querySelector('.blog-cards');

const nuevasNoticias = [
  { img: 'https://via.placeholder.com/300x200?text=Noticia+4', titulo: 'Promociones del Mes', descripcion: 'Descubre las ofertas y descuentos especiales para tu hogar.' },
  { img: 'https://via.placeholder.com/300x200?text=Noticia+5', titulo: 'Productos Eco-friendly', descripcion: 'Conoce productos sostenibles que ayudan al medio ambiente.' },
  { img: 'https://via.placeholder.com/300x200?text=Noticia+6', titulo: 'Consejos de Jardinería', descripcion: 'Tips prácticos para mantener tu jardín saludable y bonito.' }
];

verMasBtn?.addEventListener('click', () => {
  nuevasNoticias.forEach(noticia => {
    const card = document.createElement('div');
    card.classList.add('blog-card');
    card.innerHTML = `
      <img src="${noticia.img}" alt="${noticia.titulo}">
      <h3>${noticia.titulo}</h3>
      <p>${noticia.descripcion}</p>
    `;
    blogCards?.appendChild(card);
  });
  verMasBtn.style.display = 'none';
});

/* ==== MENÚ INFERIOR ==== */
const bottomLinks = document.querySelectorAll(".bottom-nav a");

bottomLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const sectionId = link.getAttribute("data-section");
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    bottomLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

/* ==== CARRUSEL DE TARJETAS ==== */
const container = document.getElementById("cards");
if (container) {
  const cards = container.querySelectorAll(".card");
  if (cards.length > 0) {
    const cardWidth = cards[0].offsetWidth + 20;

    // Clonar tarjetas para efecto infinito
    cards.forEach(card => {
      const cloneFirst = card.cloneNode(true);
      const cloneLast = card.cloneNode(true);
      container.appendChild(cloneFirst);
      container.insertBefore(cloneLast, container.firstChild);
    });

    container.scrollLeft = cardWidth * cards.length;

    window.scrollLeftFunc = () => {
      container.scrollBy({ left: -cardWidth, behavior: "smooth" });
      setTimeout(() => {
        if (container.scrollLeft <= 0) container.scrollLeft = cardWidth * cards.length;
      }, 400);
    };

    window.scrollRightFunc = () => {
      container.scrollBy({ left: cardWidth, behavior: "smooth" });
      setTimeout(() => {
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth)
          container.scrollLeft = cardWidth * cards.length;
      }, 400);
    };
  }
}

/* ==== BOTÓN DE COMPRA ==== */
document.getElementById("comprar")?.addEventListener("click", () => {
  alert("¡Felicidades por tu compra!");
});

/* ==== MENÚ HAMBURGUESA ==== */
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

menuToggle?.addEventListener('click', () => {
  navbar.classList.toggle('active'); // Muestra/oculta menú
});

/* ==== REINICIO DE PÁGINA CON TITULO ==== */
document.getElementById("siteTitle")?.addEventListener("click", () => {
  location.reload(); // Recarga toda la página
});


document.addEventListener('DOMContentLoaded', () => {
  const inputBusqueda = document.querySelector('.buscador-seccion');
  const tarjetas = document.querySelectorAll('.catalog-card');

  inputBusqueda.addEventListener('input', () => {
    const valor = inputBusqueda.value.toLowerCase().trim();

    tarjetas.forEach(tarjeta => {
      const nombreProducto = tarjeta.querySelector('h3').textContent.toLowerCase();
      
      if (nombreProducto.startsWith(valor)) {
        tarjeta.style.display = 'block';
      } else {
        tarjeta.style.display = 'none';
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const inputFiltro = document.getElementById('filtroProductos');
  const tarjetas = document.querySelectorAll('.catalog-card');

  inputFiltro.addEventListener('input', () => {
    const valor = inputFiltro.value.toLowerCase().trim();

    tarjetas.forEach(tarjeta => {
      const nombre = tarjeta.querySelector('h3')?.textContent.toLowerCase() || '';
      const precio = tarjeta.querySelector('p')?.textContent.toLowerCase() || '';

      if (nombre.includes(valor) || precio.includes(valor)) {
        tarjeta.style.display = 'block';
      } else {
        tarjeta.style.display = 'none';
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const inputBusqueda = document.querySelector('.buscador-seccion');
  const tarjetas = document.querySelectorAll('#servicios .catalog-card');

  inputBusqueda.addEventListener('input', () => {
    const valor = inputBusqueda.value.toLowerCase().trim();

    tarjetas.forEach(tarjeta => {
      const nombreServicio = tarjeta.querySelector('h3')?.textContent.toLowerCase() || '';
      const descripcion = tarjeta.querySelector('p')?.textContent.toLowerCase() || '';

      if (nombreServicio.includes(valor) || descripcion.includes(valor)) {
        tarjeta.style.display = 'block';
      } else {
        tarjeta.style.display = 'none';
      }
    });
  });
});