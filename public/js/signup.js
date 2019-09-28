document.getElementById("submit-btn").addEventListener("click", e => {
  if (
    document.getElementById("password").value ===
    document.getElementById("confirmpassword").value
  ) {
    console.log("they match");
  } else {
    console.log("they dont match");
  }

  const body = {
    first_name: document.getElementById("firstname").value,
    last_name: document.getElementById("lastname").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };
  e.preventDefault();
  console.log("click");
});
