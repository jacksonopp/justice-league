document.getElementById("signin-btn").addEventListener("click", (e) => {
    const body = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }
    e.preventDefault();
    axios.post("/signin", body).then((response) => {
        const redirectURL = response.data;
        console.log(redirectURL);
        window.location.href = redirectURL;
    })
})