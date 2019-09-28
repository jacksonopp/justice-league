document.getElementById("submit-btn").addEventListener("click", e => {
  if (
    document.getElementById("password").value ===
    document.getElementById("confirmpassword").value
  ) {
    e.preventDefault();
    console.log("they match");
    const body = {
      first_name: document.getElementById("firstname").value,
      last_name: document.getElementById("lastname").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };
    axios.post("/signup", body).then(res => {
      const redirectURL = res.data;
      console.log(redirectURL);
    });
    console.log("click");
  } else {
    // let the user know they dont match
    console.log("they dont match");
  }
});
