const inputs = document.querySelectorAll(".otp");
const eamiladd = document.getElementById("eamiladd");
const info = document.getElementById("info");
info.textContent ="";

inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    if (input.value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
    getOtpCode();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && input.value === "" && index > 0) {
      inputs[index - 1].focus();
    }
  });
});

function getOtpCode() {
  let otp = "";
  inputs.forEach((input) => {
    otp += input.value;
  });

  if (otp.length === 6) {
    verifyOtpcode(otp);
  }
}

async function verifyOtpcode(otp) {
  try {
    const response = await fetch("./api/verification-code.php", {
      method: "POST",
      credentials:"include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        otp: otp,
      }),
    });
    const data = await response.json();
    if (data.status === "success") {
      info.textContent = data.message;
      eamiladd.textContent = data.email;
      info.style.color = "green";
        setTimeout(() => {
          window.location.href = "set-password.html";
        }, 1500);
    } else {
      info.textContent = data.message;
      info.style.color = "red";
    }
  } catch (error) {
    info.textContent = "Erreur serveur. Veuillez réessayer !";
    info.style.color = "red";
  }
}
// let linkResend = document.getElementById("link-resend")
// let duration = 5 * 60;
// let timer = document.getElementById("timer");

// let interval = setInterval(() => {

//   let minutes = Math.floor(duration / 60);
//   let seconds = duration % 60;

//   minutes = minutes < 10 ? "0" + minutes : minutes;
//   seconds = seconds < 10 ? "0" + seconds : seconds;

//   timer.textContent = minutes + ":" + seconds;

//   if (duration <= 0) {
//     clearInterval(interval);

//     linkResend.innerHTML = '<a href="#">Renvoyer le code</a>';
//   }

//   duration--;

// }, 1000);


let duration = 5 * 60;
let timer = document.getElementById("timer");
let renvoie = document.getElementById("renvoie");

let interval = setInterval(() => {

  let minutes = Math.floor(duration / 60);
  let seconds = duration % 60;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timer.textContent = minutes + ":" + seconds;

  if (duration <= 0) {
    clearInterval(interval);

    renvoie.innerHTML = `<a href="#" id="renvoieCode">Renvoyer le code</a>`;

    document.getElementById("renvoieCode").addEventListener("click", renvoieOTP);
  }

  duration--;

}, 1000);


async function renvoieOTP(e){
  e.preventDefault();

  const response = await fetch("./api/resend-new-otp.php", {
    method: "POST",
    credentials:"include",
    headers:{ "Content-Type": "application/json" }
  });

  const data = await response.json();

  if(data.success){
    document.getElementById("info").textContent = "Nouveau code envoyé";
    restartTimer();
  }
}


function restartTimer(){

  duration = 5 * 60;

  renvoie.innerHTML = "";

  interval = setInterval(() => {

    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timer.textContent = minutes + ":" + seconds;

    if (duration <= 0) {
      clearInterval(interval);

      resend.innerHTML = `<a href="#" id="renvoieCode">Renvoyer le code</a>`;
      document.getElementById("renvoieCode").addEventListener("click", renvoieOTP);
    }

    duration--;

  },1000);
}
async function getEmail(){
  const reponse = await fetch("./api/get-session.php");
  const data = await reponse.json();
  const email = data.email
eamiladd.textContent = email;
}

getEmail();