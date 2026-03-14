document.addEventListener("DOMContentLoaded", () => {
  const register = document.getElementById("register");
  register.addEventListener("submit",async (e) => {
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

    
    info.textContent = "Inscription en cours...";
    info.style.color = "green";

    
      try {
        const response = await fetch("",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            username:username,
            email:email,
            password:password
          })
        })
        const data = await response.json()
        if (data.status === "success"){

        }else{

        }
      } catch (error) {
        info.textContent = "Erreur serveur. Veuillez réessayer !";
        info.style.color = "red";
        
      }
  });
});

let eyes = document.querySelectorAll(".fa-eye");
eyes.forEach((eye) => {
  eye.addEventListener("click", () => {
    let input = eye.parentElement.querySelector("input");

    if (input.type === "password") {
      input.type = "text";
      eye.classList.add("active");
    } else {
      input.type = "password";
      eye.classList.remove("active");
    }
  });
});
