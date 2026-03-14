document.addEventListener("DOMContentLoaded", () => {
  const register = document.getElementById("forgotpassword");
  register.addEventListener("submit", async (e) => {
    e.preventDefault();
    const info = document.getElementById("info");

    const email = document.getElementById("email").value.trim();

    info.textContent = "";

    if (email && !emailValid(email)) {
      info.textContent = "Votre email n'est pas valide";
      info.style.color = "red";
      return;
    }

    function emailValid(email) {
      const regEx = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      return regEx.test(email);
    }

    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
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
