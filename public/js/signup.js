function emailIsValid(email) {
  return /\S+@\S+\.\S+/.test(email);
}

document.getElementById("signup-btn").addEventListener("click", e => {
  e.preventDefault();

  const validEmail = emailIsValid(document.getElementById("email").value);

  if (
    document.getElementById("password").value ===
      document.getElementById("confirm-password").value &&
    validEmail
  ) {
    console.log("click");
    const body = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      car: document.getElementById("")
    };

    e.preventDefault();
    console.log("click");
    axios.post("/questionaire", body).then(response => {
      const redirectURL = response.data;
      window.location.href = redirectURL;
    });
  } else if (!validEmail) {
    document.getElementById("emailModal").style.display = "block";
  }
  console.log("didn't match");
  if (
    document.getElementById("password").value !==
    document.getElementById("confirm-password").value
  ) {
    document.getElementById("passwordModal").style.display = "block";
  }

  if (
    document.getElementById("username").value === "" ||
    document.getElementById("email").value === "" ||
    document.getElementById("password").value === ""
  ) {
    document.getElementById("emptyInputModal").style.display = "block";
  }
});

document.getElementById("modalClose").addEventListener("click", function() {
  document.getElementById("emailModal").style.display = "none";
});

document.getElementById("passwordClose").addEventListener("click", function() {
  document.getElementById("passwordModal").style.display = "none";
});

document
  .getElementById("emptyInputClose")
  .addEventListener("click", function() {
    document.getElementById("emptyInputModal").style.display = "none";
  });
