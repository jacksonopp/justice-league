const userInfo = {};

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  userInfo = {
    id: profile.getId(),
    name: profile.getName(),
    imageUrl: profile.getImageUrl(),
    email: profile.getEmail()
  };
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log("User signed out.");
  });
}

axios
  .post("/api/private", userInfo)
  .then(function() {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
