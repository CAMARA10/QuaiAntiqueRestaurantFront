const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials(){
    
    if(mailInput.value == "test@mail.fr" && passwordInput.value == "123")
    {
        //recupération du vrai token
        const token= "jgs<cjgvjhvsqvckhgjhgskvgkghvjhq";
        setToken(token);

        setCookie(roleCookieName, "client", 7);
        //alert("vous êtes connecté");

        window.location.replace("/");

    }
    else
    {
        mailInput.classList.add("is-invalid");
       passwordInput.classList.add("is-invalid");
    }
}

