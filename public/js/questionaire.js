document.getElementById("submit-btn").addEventListener("click", e => {
  let body = {};
  body.car_model = document.getElementById("carInput").value;
  body.img = document.getElementById("imgInput").value;
  body.city = document.getElementById("cityInput").value;
  body.about = document.getElementById("aboutInput").value;
  e.preventDefault();
  console.log(body);

  if (
    document.getElementById("imgInput").value === "" ||
    document.getElementById("carInput").value === "" ||
    document.getElementById("cityInput").value === "" ||
    document.getElementById("aboutInput").value === ""
  ) {
    document.getElementById("emptyInputModal").style.display = "block";
    document
      .getElementById("emptyInputClose")
      .addEventListener("click", function() {
        document.getElementById("emptyInputModal").style.display = "none";
      });
  } else {
    axios.put("/questionaire2", body).then(response => {
      console.log(response);
      window.location.href = "/dashboard";
    });
  }
});
