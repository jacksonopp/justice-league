document.getElementById("signin-btn").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("click")
    const body = {
        email: document.getElementById("username").value,
        password: document.getElementById("password").value
    }
    e.preventDefault();
    axios.post("/", body).then((response) => {
        const redirectURL = response.data;
        console.log(redirectURL);
        window.location.href = redirectURL;
    })
})
