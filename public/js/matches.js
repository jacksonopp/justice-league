axios.get("/api/matches").then(function(response) {
  console.log(response.data);
  response.data.forEach(user => {
    const userInfo = document.getElementById("userInfo");
    const userName = document.createElement("div");
    userName.setAttribute("class", "card");
    userName.innerHTML =
      user[0].username + "<br>" + user[0].email + "<br>" + user[0].about;

    userInfo.append(userName);
  });
});
