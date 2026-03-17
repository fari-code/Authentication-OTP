//Traitement du login
document.addEventListener("DOMContentLoaded", () => {
  const login = document.getElementById("login");
  login.addEventListener("submit", async (e) => {
    e.preventDefault();
    const info = document.getElementById("info");
    const password = document.getElementById("password").value.trim();
    const email = document.getElementById("email").value.trim();
    info.textContent = "";

    if (email && !emailValid(email)) {
      info.textContent = "Votre email n'est pas valide";
      info.style.color = "red";
      return;
    }

    if (password.length < 6) {
      info.textContent = "Le mot de passe est incorrecte.";
      info.style.color = "red";
      return;
    }

    function emailValid(email) {
      const regEx = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      return regEx.test(email);
    }

    try {
      const response = await fetch("api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
        info.textContent = data.message;
        info.style.color = "green";
        setTimeout(() => {
          info.textContent = "Redirection...";
          info.style.color = "green";
        }, 1500);
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
      } else {
        info.textContent = data.message;
        info.style.color = "red";
      }
    } catch (error) {
      info.textContent = "Erreur serveur. Veuillez réessayer !";
      info.style.color = "red";
    }
  });
});

let input = document.querySelector(".pwd input");
let action = document.querySelector(".fa-eye");
action.addEventListener("click", () => {
  if (input.type === "password") {
    input.type = "text";
    action.classList.add("active");
  } else {
    input.type = "password";
    action.classList.remove("active");
  }
});
