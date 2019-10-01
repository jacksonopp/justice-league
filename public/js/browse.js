console.log("is loaded");

function getUsers() {
  axios.get("api/users").then(function(response) {
    let i = 0;
    let j = 0;
    let k = 0;
    let l = 0;

    function newUserName() {
      i++;
      i = i % response.data.length;
      console.log(response.data[i].username);

      return response.data[i].username;
    }

    function newUserAbout() {
      j++;
      j = j % response.data.length;
      console.log(response.data[i].about);

      return response.data[i].about;
    }

    function newUserImage() {
      k++;
      k = k % response.data.length;
      console.log(response.data[i].image);

      return response.data[i].status;
    }

    function newUserId() {
      i++;
      i = i % response.data.length;
      // console.log(response.data[i].image);

      return response.data[i].id;
    }

    function newUserId() {
      l++;
      l = l % response.data.length;
      console.log(response.data[i].id);

      return response.data[i].id;
    }

    document
      .getElementById("greenBtn")
      .addEventListener("click", function(event) {
        document.getElementById("cardUsername").innerHTML = newUserName();

        document.getElementById("cardUserAbout").innerHTML = newUserAbout();
        document
          .getElementById("cardUserImg")
          .setAttribute("src", newUserImage);
        axios
          .post("/api/matches/" + true, { id: newUserId(), yesOrNo: true })
          .then(function() {});

        axios.post("/id").then(function() {});

        //make axios post or put call to send to matched
      });

    document
      .getElementById("redBtn")
      .addEventListener("click", function(event) {
        axios
          .post("/api/matches/" + false, {
            id: response.data[i].id,
            yesOrNo: false
          })
          .then(function() {});
        document.getElementById("cardUsername").innerHTML = newUserName();
        document.getElementById("cardUserAbout").innerHTML = newUserAbout();
        document
          .getElementById("cardUserImg")
          .setAttribute("src", newUserImage);
        console.log(newUserId());
        axios.post("/id").then(function() {});
        //make axios post or put call to send to disliked
      });
  });
}

getUsers();
