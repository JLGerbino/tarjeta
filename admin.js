// === Importar Firebase ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { 
  getFirestore, collection, query, orderBy, onSnapshot 
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {

  // === Protección de páginas ===
const paginaActual = window.location.pathname;

// Si está en una subpágina de admin (confirmaciones o canciones)
if (paginaActual.includes("paginasAdmin")) {
  const adminLogueado = localStorage.getItem("adminLogueado");
  if (adminLogueado !== "true") {
    // 🔒 Redirigir al login si no hay sesión
    window.location.href = "../admin.html"; // ajustá si el login está en otra ruta
  } else {
    // Evita que el usuario vuelva atrás y vea páginas cacheadas
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }
}
/* nuevo */





  // === Elementos del DOM (algunos pueden no existir según la página) ===
  const loginDiv = document.getElementById("login");
  const panelDiv = document.getElementById("panel");
  const tabla = document.getElementById("tablaConfirmaciones");
  const btnLogin = document.getElementById("btnLogin");
  const inputClave = document.getElementById("clave");
  const totalInvitados = document.getElementById("totalInvitados");
  const totalPersonas = document.getElementById("totalPersonas");
  const btnLogout = document.getElementById("btnLogout");
  const toggleBtn = document.getElementById("toggleClave");

  const CLAVE_ADMIN = "carla15"; // 🔐 Contraseña de acceso

  // === Inicializar Firebase ===
  const firebaseConfig = {
    apiKey: "AIzaSyA-QwW-E22kLuc5_2-ohN2Z9IJ_2rjaGz8",
    authDomain: "fiestacarla-7c026.firebaseapp.com",
    projectId: "fiestacarla-7c026",
    storageBucket: "fiestacarla-7c026.firebasestorage.app",
    messagingSenderId: "97543193817",
    appId: "1:97543193817:web:5948e337d2492f2d866ac8"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  console.log("✅ Firebase conectado correctamente");

  // === Función para cargar confirmaciones ===
  function cargarConfirmaciones() {
    if (!tabla) return;

    const q = query(collection(db, "confirmaciones"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      tabla.innerHTML = "";
      let totalAsistentes = 0;
      let cantidadRegistros = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        const fecha = data.timestamp?.toDate().toLocaleString() || "-";
        const fila = `
          <tr>
            <td>${data.nombre}</td>
            <td>${data.cantidad}</td>
            <td>${data.comentario || ""}</td>
            <td>${fecha}</td>
          </tr>`;
        tabla.innerHTML += fila;

        cantidadRegistros++;
        totalAsistentes += parseInt(data.cantidad) || 0;
      });

      if (totalInvitados) totalInvitados.textContent = cantidadRegistros;
      if (totalPersonas) totalPersonas.textContent = totalAsistentes;
    });
  }

  // === Función para cargar canciones ===
  function cargarCanciones() {
    if (!tabla) return;

    const q = query(collection(db, "canciones"));
    onSnapshot(q, (snapshot) => {
      tabla.innerHTML = "";

      snapshot.forEach((doc) => {        
        const data = doc.data();        
        const fila = `
          <tr>
            <td>${data.nombre}</td>
            <td>${data.cancion}</td>            
          </tr>`;
        tabla.innerHTML += fila;
      });
    });
  }

  // === Mostrar / Ocultar contraseña ===
  if (toggleBtn && inputClave) {
    toggleBtn.addEventListener("click", () => {
      const mostrar = inputClave.type === "password";
      inputClave.type = mostrar ? "text" : "password";
      const icon = toggleBtn.querySelector("i");
      icon.classList.toggle("bi-eye");
      icon.classList.toggle("bi-eye-slash");
    });
  }

  // === Detectar en qué página estamos ===
  const pagina = window.location.pathname;

  // 👉 Si es la página de confirmaciones
  if (pagina.includes("confirmaciones.html")) {
    console.log("📋 Cargando confirmaciones...");
    cargarConfirmaciones();
    return;
  }

  // 👉 Si es la página de canciones
  if (pagina.includes("canciones.html")) {
    console.log("🎵 Cargando canciones...");
    cargarCanciones();
    return;
  }

  // === Página principal (login del admin) ===
  const adminLogueado = localStorage.getItem("adminLogueado");

  if (adminLogueado === "true") {
    loginDiv?.classList.add("oculto");
    panelDiv?.classList.remove("oculto");
  }

  // === Login ===
  btnLogin?.addEventListener("click", () => {
    if (inputClave.value === CLAVE_ADMIN) {
      localStorage.setItem("adminLogueado", "true");
      loginDiv.classList.add("oculto");
      panelDiv.classList.remove("oculto");
    } else {
      alert("Contraseña incorrecta ❌");
    }
  });

/* nuevo logout */
 btnLogout?.addEventListener("click", () => {
  localStorage.removeItem("adminLogueado");
  window.location.href = "admin.html"; // o la ruta que uses para el login
});



  // === Logout ===
  /* btnLogout?.addEventListener("click", () => {
    localStorage.removeItem("adminLogueado");
    location.reload();
  }); */
});





 