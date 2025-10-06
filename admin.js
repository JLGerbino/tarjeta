import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { 
  getFirestore, collection, query, orderBy, onSnapshot 
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  const loginDiv = document.getElementById("login");
  const panelDiv = document.getElementById("panel");
  const tabla = document.getElementById("tablaConfirmaciones");
  const btnLogin = document.getElementById("btnLogin");
  const inputClave = document.getElementById("clave");

  const totalInvitados = document.getElementById("totalInvitados");
  const totalPersonas = document.getElementById("totalPersonas");

  const CLAVE_ADMIN = "carla15"; // 🔐 Cambiala por la que quieras

  // 🔥 Inicializa Firebase directamente acá
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
  console.log("DB conectada:", db);

  btnLogin.addEventListener("click", () => {
    if (inputClave.value === CLAVE_ADMIN) {
      loginDiv.classList.add("oculto");
      panelDiv.classList.remove("oculto");
      cargarConfirmaciones();
    } else {
      alert("Contraseña incorrecta ❌");
    }
  });

function cargarConfirmaciones() {
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

        // Contadores
        cantidadRegistros++;
        totalAsistentes += parseInt(data.cantidad) || 0;
      });

      // Mostrar totales
      totalInvitados.textContent = cantidadRegistros;
      totalPersonas.textContent = totalAsistentes;
    });
  }  
});

// Mostrar/ocultar contraseña
const toggleBtn = document.getElementById("toggleClave");
const inputClave = document.getElementById("clave");

if (toggleBtn && inputClave) {
  toggleBtn.addEventListener("click", () => {
    const mostrar = inputClave.type === "password";
    inputClave.type = mostrar ? "text" : "password";

    const icon = toggleBtn.querySelector("i");
    icon.classList.toggle("bi-eye");
    icon.classList.toggle("bi-eye-slash");
  });
}






