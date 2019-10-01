axios.get("/").then(function(response) {
  response.forEach(user => {
    const userInfo = document.getElementById("userInfo");
    const userName = document.createElement("h2");
    userName.innerText = user.data.username;
    userInfo.append(userName);
  });
});
