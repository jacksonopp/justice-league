axios.get("/api/matches").then(function(response) {
  console.log(response.data);
  response.data.forEach(user => {
    const userInfo = document.getElementById("userInfo");
    const userImage = document.createElement("img");
    const userName = document.createElement("div");
    const userEmail = document.createElement("div");
    const userAbout = document.createElement("div");

    userImage.setAttribute("src", user[0].image);
    userImage.setAttribute("class", "img-fluid matchesImg");

    userName.setAttribute("class", "matchesData");
    userName.innerHTML = user[0].username;

    userEmail.setAttribute("class", "matchesEmail");
    userEmail.innerHTML = user[0].email;

    userAbout.setAttribute("class", "matchesAbout");
    userAbout.innerHTML = user[0].about;

    userInfo.append(userImage);
    userInfo.append(userName);
    userInfo.append(userEmail);
    userInfo.append(userAbout);
  });
});
