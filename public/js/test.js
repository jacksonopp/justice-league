function submit(answer) {
  let yesOrNo = true;
  switch (answer) {
    case "yes":
      yesOrNo = true;
      break;
    case "no":
      yesOrNo = false;
      break;
    default:
      yesOrNo = true;
  }
  const id = document.getElementById("number").value;

  axios.post("/api/matches/" + yesOrNo, { id, yesOrNo }).then(response => {
    console.log(response);
  });
}
