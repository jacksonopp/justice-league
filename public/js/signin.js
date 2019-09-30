// const moment = require("moment");

// get the sign in button and add event listener
document.getElementById("signin-btn").addEventListener("click", e => {
  // prevent default
  e.preventDefault();
  console.log("click");
  // set up body
  const body = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  };
  console.log({ body });
  // send body in a post request
  axios.post("/", body).then(response => {
    const redirectURL = response.data;
    console.log(redirectURL);
    window.location.href = redirectURL;
  });
});
