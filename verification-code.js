const inputs = document.querySelectorAll(".otp");

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
    const response = await fetch("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        otp: otp
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
}
