axios.get("/api/matches").then(function(response) {
  console.log(response.data);
  response.data.forEach(user => {
    const userInfo = document.getElementById("userInfo");
    const userName = document.createElement("div");
    userName.setAttribute("class", "card");
    userName.innerHTML =
      user.username + "<br>" + user.email + "<br>" + user.about;

    userInfo.append(userName);
  });
});
