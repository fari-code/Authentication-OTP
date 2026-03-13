document.addEventListener("DOMContentLoaded", () => {
  const register = document.getElementById("register");
  register.addEventListener("submit", (e) => {
    e.preventDefault();
    const info = document.getElementById("info");
    const password = document.getElementById("password").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const confirmPassword = document.getElementById("pwd").value.trim();
    info.textContent = "";

    if (username.length < 4) {
      info.textContent = "Le nom d'utilisateur n'est pas valide";
      info.style.color = "red";
      return;
    }

    if (password.length < 6) {
      info.textContent = "Le mot de passe doit avoir au moins 6 caractères.";
      info.style.color = "red";
      return;
    }

    if (email && !emailValid(email)) {
      info.textContent = "Votre email n'est pas valide";
      info.style.color = "red";
      return;
    }

    if (confirmPassword != password) {
      info.textContent = "Les mots de passe ne correspondent pas";
      info.style.color = "red";
      return;
    }

    function emailValid(email) {
      const regEx = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      return regEx.test(email);
    }

    // Si tout est valide, soumettre le formulaire
    info.textContent = "Inscription en cours...";
    info.style.color = "green";

    // Soumettre le formulaire après validation
      register.submit();
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
