// === Importar Firebase ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { 
  getFirestore, collection, query, orderBy, onSnapshot 
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {

  // === Elementos del DOM (puede que algunos no existan según la página) ===
  const loginDiv = document.getElementById("login");
  const panelDiv = document.getElementById("panel");
  const tabla = document.getElementById("tablaConfirmaciones");
  const btnLogin = document.getElementById("btnLogin");
  const inputClave = document.getElementById("clave");
  const totalInvitados = document.getElementById("totalInvitados");
  const totalPersonas = document.getElementById("totalPersonas");
  const btnLogout = document.getElementById("btnLogout");

  // === Configuración Firebase ===
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

  console.log("✅ DB conectada:", db);

  // === Función para cargar confirmaciones ===
  function cargarConfirmaciones() {
    if (!tabla) return; // si la página no tiene tabla, no hace nada

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
            <td>${data.comentario}</td>
            <td>${fecha}</td>
          </tr>`;
        tabla.innerHTML += fila;

        cantidadRegistros++;
        totalAsistentes += parseInt(data.cantidad) || 0;
      });

      // Mostrar totales si existen los elementos
      if (totalInvitados) totalInvitados.textContent = cantidadRegistros;
      if (totalPersonas) totalPersonas.textContent = totalAsistentes;
    });
  }

  // === Mostrar / Ocultar contraseña (solo si hay input) ===
  const toggleBtn = document.getElementById("toggleClave");
  if (toggleBtn && inputClave) {
    toggleBtn.addEventListener("click", () => {
      const mostrar = inputClave.type === "password";
      inputClave.type = mostrar ? "text" : "password";
      const icon = toggleBtn.querySelector("i");
      icon.classList.toggle("bi-eye");
      icon.classList.toggle("bi-eye-slash");
    });
  }

  // === Modo página de confirmaciones ===
  // Si no hay login pero hay tabla, cargar datos directo (para páginas internas)
  if (!loginDiv && tabla) {
    console.log("📋 Página de confirmaciones: cargando datos...");
    cargarConfirmaciones();
    return;
  }

  // === Modo página principal con login ===
  const CLAVE_ADMIN = "carla15";
  const adminLogueado = localStorage.getItem("adminLogueado");

  if (adminLogueado === "true") {
    loginDiv?.classList.add("oculto");
    panelDiv?.classList.remove("oculto");
    cargarConfirmaciones();
  }

  btnLogin?.addEventListener("click", () => {
    if (inputClave.value === CLAVE_ADMIN) {
      localStorage.setItem("adminLogueado", "true");
      loginDiv.classList.add("oculto");
      panelDiv.classList.remove("oculto");
      cargarConfirmaciones();
    } else {
      alert("Contraseña incorrecta ❌");
    }
  });

  btnLogout?.addEventListener("click", () => {
    localStorage.removeItem("adminLogueado");
    location.reload();
  });

});






