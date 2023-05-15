function validate(){
    let imie=document.getElementById("imie").value;
    let nazwisko=document.getElementById("lastName").value;
    let email=document.getElementById("email").value;
    let valid;
    valid = !!(validateLenght(2, 60, imie.length) && validateLenght(2, 60, nazwisko.length) && validateLenght(5, 60, email.length));
    if(!valid)s
        document.getElementById("errorText").innerText = "Formularz zawiera błędy";
    else accepted()
    return valid;
}
function validateLenght(min,max,value){
        return min < value && max > value;
}
function accepted(){
    alert("poprawnie dodano pracownika")
}
