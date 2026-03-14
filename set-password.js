document.addEventListener("DOMContentLoaded", () => {
  const register = document.getElementById("setpassword");
  register.addEventListener("submit", async (e) => {
    e.preventDefault();
    const info = document.getElementById("info");

    const passwordSet = document.getElementById("password-set").value.trim();

    info.textContent = "";

    if (passwordSet.length < 6) {
      info.textContent = "Le mot de passe doit avoir au moins 6 caractères.";
      info.style.color = "red";
      return;
    }

    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passwordSet: passwordSet,
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
      } else {
      }
    } catch (error) {
      info.textContent = "Erreur serveur. Veuillez réessayer !";
      info.style.color = "red";
    }
  });
});
