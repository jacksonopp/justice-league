console.log("is loaded");

const userArr = [
  {
    userName: "userName",
    carURL: "carURL",
    make: "make"
  },
  {
    userName: "Paul Walker",
    carURL: "Nissan",
    make: "was"
  }
];

let i = 0;

function newUser() {
  i++;
  i = i % userArr.length;
  return userArr[i].userName;
}

function lastUser() {
  if (i === 0) {
    // i would become 0
    i = arr.length; // so put it at the other end of the array
  }
  i--;
  return userArr[i].userName;
}

document.getElementById("greenBtn").addEventListener("click", function(event) {
  document.getElementById("userDetails").innerText = newUser();
  document.createElement("button");
});

console.log(userArr.userName);

userArr.forEach(function(user) {
  document.getElementById("userBio").innerHTML = user.userName;
});
