function validate(){
    let imiePacj=document.getElementById("imiePacj").value;
    let nazwiskoPacj=document.getElementById("nazwiskoPacj").value;
    let peselPacj=document.getElementById("peselPacj").value;
    let adres=document.getElementById("adresPacj").value;
    let valid;
    valid = !!(validateLenght(2, 60, imiePacj.length) && validateLenght(2, 60, nazwiskoPacj.length) && validateLenght(5, 60, peselPacj.length) && validateLenght(5, 60, adres.length));
    if(!valid)
        document.getElementById("errorText").innerText = "Formularz zawiera błędy";
    else accepted()
    return valid;
}
function validateLenght(min,max,value){
    return min <= value && max >= value;
}
function accepted(){
    alert("poprawnie dodano pacjenta")
}
