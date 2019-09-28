
document.getElementById("signup-btn").addEventListener("click", (e) => {
    const body = {
        first_name: document.getElementById("firstname").value,
        last_name: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }

    e.preventDefault();
    console.log("click");
    axios.post("/signup", body).then((response) => {
        const redirectURL = response.data;
        window.location.href = redirectURL;
    });
})