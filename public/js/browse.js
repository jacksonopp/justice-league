console.log("is loaded");

function getUsers() {
  axios.get("api/users").then(function(response) {
    let i = 0;

    function newUserName() {
      i++;
      i = i % response.data.length;
      console.log(response.data[i].username);

      return response.data[i].username;
    }

    function newUserAbout() {
      // i++;
      i = i % response.data.length;
      console.log(response.data[i].about);

      return response.data[i].about;
    }

    function newUserImage() {
      i++;
      i = i % response.data.length;
      console.log(response.data[i].image);

      return response.data[i].image;
    }

    document
      .getElementById("greenBtn")
      .addEventListener("click", function(event) {
        axios.post("/id").then(function() {});
        document.getElementById("cardUsername").innerHTML = newUserName();
        document.getElementById("cardUserAbout").innerHTML = newUserAbout();
        document
          .getElementById("cardUserImg")
          .setAttribute("src", newUserImage);

        //make axios post or put call to send to matched
      });

    document
      .getElementById("redBtn")
      .addEventListener("click", function(event) {
        axios.post("/id").then(function() {});
        document.getElementById("cardUsername").innerHTML = newUserName();
        document.getElementById("cardUserAbout").innerHTML = newUserAbout();
        document
          .getElementById("cardUserImg")
          .setAttribute("src", newUserImage);

        //make axios post or put call to send to disliked
      });
  });
}

getUsers();
