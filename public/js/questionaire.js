document.getElementById("submit-btn").addEventListener("click", e => {
  let body = {};
  body.car_model = document.getElementById("carInput").value;
  body.img = document.getElementById("imgInput").value;
  body.city = document.getElementById("cityInput").value;
  body.about = document.getElementById("aboutInput").value;
  e.preventDefault();
  console.log(body);

  axios.put("/questionaire2", body).then(response => {
    console.log(response);
  });
  window.location.href = "/dashboard";
});
