let userInfo = {};

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  userInfo = {
    name: profile.getName(),
    imageUrl: profile.getImageUrl(),
    email: profile.getEmail()
  };

  console.log({ userInfo });
  axios
    .post("/api/private", userInfo)
    .then(function(response) {
      window.location.href = response.data.redirectURL;
    })
    .catch(function(error) {
      console.log(error);
    });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log("User signed out.");
  });
}
