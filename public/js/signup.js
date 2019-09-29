
document.getElementById("signup-btn").addEventListener("click", (e) => {
    e.preventDefault();
    if (document.getElementById("password").value === document.getElementById("confirm-password").value) {
        console.log("click");
        const body = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }

        e.preventDefault();
        console.log("click");
        axios.post("/questionaire", body).then((response) => {
            const redirectURL = response.data;
            window.location.href = redirectURL;
        });
    } else {
        console.log("didn't match");
    }
});