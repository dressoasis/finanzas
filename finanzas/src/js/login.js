const formLogin =document.getElementById("form-login")

formLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    const intupUsername = formLogin.username.value;
    const intupPassword = formLogin.password.value;
    login(intupUsername,intupPassword)

})

async function login(username, password) {
    let response = await fetch(`http://localhost:3000/users?username=${username}`)
    let data = await response.json()

    if (data.length === 0) {
        alert("credenciales incorrectas")
    }else{
        const userFound = data[0]
        
        if (userFound.password ===password) {
            localStorage.setItem("currentUser",JSON.stringify(userFound))
            alert("login correcto")
            window.location.href = "../views/dashboard.html"
        }else{
            alert("credenciales incorrectas")
        }
    }

}