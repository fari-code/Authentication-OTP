document.addEventListener("DOMContentLoaded", () => {
  const register = document.getElementById("setpassword");
  register.addEventListener("submit", async (e) => {
    e.preventDefault();
    const info = document.getElementById("info");

    const passwordSet = document.getElementById("password-set").value;
    console.log(passwordSet)
    info.textContent = "";

    if (passwordSet.length < 6) {
      info.textContent = "Le mot de passe doit avoir au moins 6 caractères.";
      info.style.color = "red";
      return;
    }

    try {
      const response = await fetch("api/set-password.php", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passwordSet: passwordSet,
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
        info.textContent = data.message;
        info.style.color = "green";
        setTimeout(() => {
          window.location.href = "login.html";
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