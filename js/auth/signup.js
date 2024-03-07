//application js sur ma page signup

const inputNom=document.getElementById("NomInput");
const inputPrenom=document.getElementById("PrenomInput");
const inputMail=document.getElementById("EmailInput");
const inputPassword=document.getElementById("PasswordInput");
const inputValidatePassword=document.getElementById("ValidatePasswordInput");
const btnValidation=document.getElementById("btn-validation-inscription");
const formInscription = document.getElementById("formulaireInscription");

//l'ecouteur de mon clavier
inputNom.addEventListener("keyup", validateForm);
inputPrenom.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidatePassword.addEventListener("keyup", validateForm);

btnValidation.addEventListener("click", inscriptionUtilisateur);

//function de validation du formulaire
function validateForm(){
    const nomOk = validateRequire(inputNom);
    const prenomOk = validateRequire(inputPrenom);
    const mailOk = validateEmail(inputMail);
    const passwordOk = validatePassword(inputPassword);
    const validatePasswordOK = validateConfirmationPassword(inputPassword, inputValidatePassword);

    if(nomOk && prenomOk && mailOk && passwordOk && validatePasswordOK){
        btnValidation.disabled = false;
    }
    else {
        btnValidation.disabled = true;
    }
}

function validateConfirmationPassword(inputPwd, inputConfirmPwd){

    if(inputPwd.value == inputConfirmPwd.value){
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    }
    else{
        inputConfirmPwd.classList.add("is-invalid");
        inputConfirmPwd.classList.remove("is-valid");
        return false;
    }
}

function validatePassword(input){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;

    if(passwordUser.match(passwordRegex)){
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        return true;
     }
     else{
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        return false;
    }
}

function validateEmail(input){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if(mailUser.match(emailRegex)){
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        return true;
     }
     else{
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        return false;
    }
}

function validateRequire(input){
    if(input.value != ''){
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        return true;
    }
    else{
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        return false;
    }
}

function inscriptionUtilisateur(){

    let dataForm = new FormData(formInscription);
   
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "firstName": dataForm.get("nom"),
        "lastName": dataForm.get("prenom"),
        "email": dataForm.get("email"),
        "password": dataForm.get("mdp")
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
};

    fetch(apiUrl+"registration", requestOptions)
    .then((response) => {
        if(response.ok){
            return response.json();
        }else{
            alert("Erreur lors de l'inscription");
        }
    })
    .then((result) => {
      document.location.href="/signin";
      alert("Bravo "+ dataForm.get("prenom")+" Vous êtes bien inscrit maintenant")
    })
    .catch((error) => console.error(error));
}
