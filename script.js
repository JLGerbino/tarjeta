
// Carrusel
let index = 0;
const images = document.querySelectorAll('.carousel img');

setInterval(() => {
    images[index].classList.remove('active');
    index = (index + 1) % images.length;
    images[index].classList.add('active');
}, 3000);

// Control de música
const musicToggle = document.getElementById("musicToggle");
const iconPlay = document.getElementById("iconPlay");
const iconPause = document.getElementById("iconPause");
const bgMusic = document.getElementById("bgMusic");

let isPlaying = false;

musicToggle.addEventListener("click", () => {
  if (!isPlaying) {
    bgMusic.play();
    iconPlay.style.display = "none";
    iconPause.style.display = "inline";
  } else {
    bgMusic.pause();
    iconPlay.style.display = "inline";
    iconPause.style.display = "none";
  }
  isPlaying = !isPlaying;
});

// Función para actualizar con efecto flip
function updateFlip(id, newValue) {
    const el = document.getElementById(id);
    const formattedValue = String(newValue).padStart(2, "0"); // Siempre con 2 dígitos

    if (el.innerText !== formattedValue) {
        el.classList.remove("animate");
        void el.offsetWidth; // ⚡ reinicia la animación
        el.innerText = formattedValue;
        el.classList.add("animate");
    }
}

// Cuenta regresiva
const targetDate = new Date("2025-12-13T21:00:00").getTime();

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("timer").innerHTML = '<h1 class="mensaje-fiesta">A disfrutar la fiesta!</h1>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    updateFlip("days", days);
    updateFlip("hours", hours);
    updateFlip("minutes", minutes);
    updateFlip("seconds", seconds);
}, 1000);

function abrirDialogo(id) {
  document.getElementById(id).showModal();
}

function cerrarDialogo(id) {
  document.getElementById(id).close();
}

/*animacion fiesta*/
/* lottie.loadAnimation({
  container: document.getElementById('iconFiesta'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://lottie.host/250fc3f4-bc3e-4a6d-8328-26ef9a8d34b8/b2yyeGQj7o.json'
}); */

/*animacion lugar*/
/* lottie.loadAnimation({
  container: document.getElementById('iconLugar'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://lottie.host/7cccf2fc-84a6-4a8b-a6cb-9d321b2d5e0d/m7lbhhQe1D.json'
}); */

/*animacion ubicacion*/
/* lottie.loadAnimation({
  container: document.getElementById('iconDireccion'),
  renderer: 'svg',
  loop: true,
  autoplay: true, */  
  /*path: 'https://lottie.host/89324d9e-3eaf-4a38-b244-19cda3c6a391/2zjsRjvUwl.json'*/
/* }); */

// 🎉 Datos del evento (modificás solo acá)
const evento = {
  titulo: "Fiesta 15 años de Carla",
  descripcion: "¡No faltes a la fiesta de 15 de Carla!",
  ubicacion: "La Fontana Eventos - Ruta 177 y calle Tito Martin - Villa Cosntitución",
  inicio: "2025-12-13T21:00:00", // formato ISO
  fin: "2025-12-14T05:00:00"
};

// Generador de URLs dinámicas
function generarLinks(evento) {
  // Google Calendar → fechas en formato YYYYMMDDTHHmmss
  const inicioGoogle = evento.inicio.replace(/[-:]/g, "").split(".")[0];
  const finGoogle = evento.fin.replace(/[-:]/g, "").split(".")[0];

  const googleURL = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(evento.titulo)}` +
    `&details=${encodeURIComponent(evento.descripcion)}` +
    `&location=${encodeURIComponent(evento.ubicacion)}` +
    `&dates=${inicioGoogle}/${finGoogle}`;

  // Outlook
  const outlookURL = `https://outlook.live.com/calendar/0/deeplink/compose?` +
    `subject=${encodeURIComponent(evento.titulo)}` +
    `&body=${encodeURIComponent(evento.descripcion)}` +
    `&startdt=${evento.inicio}` +
    `&enddt=${evento.fin}` +
    `&location=${encodeURIComponent(evento.ubicacion)}`;

  // Archivo .ics
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TuInvitacion//Fiesta//ES
BEGIN:VEVENT
UID:fiesta@example.com 
DTSTAMP:${inicioGoogle}
DTSTART:${inicioGoogle}
DTEND:${finGoogle}
SUMMARY:${evento.titulo}
LOCATION:${evento.ubicacion}
DESCRIPTION:${evento.descripcion}
END:VEVENT
END:VCALENDAR`;

  const icsBlob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const icsURL = URL.createObjectURL(icsBlob);

  return { googleURL, outlookURL, icsURL };
}

// Insertar en los botones
window.addEventListener("DOMContentLoaded", () => {
  const { googleURL, outlookURL, icsURL } = generarLinks(evento);

  document.getElementById("googleBtn").href = googleURL;
  document.getElementById("outlookBtn").href = outlookURL;
  document.getElementById("icsBtn").href = icsURL;
  document.getElementById("icsOtros").href = icsURL;
});

/* UID:fiesta-50@example.com */