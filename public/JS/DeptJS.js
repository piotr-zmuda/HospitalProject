function validate(){
    let nazwa=document.getElementById("nazwa");
    let iloscPracownikow=document.getElementById("iloscPracownikow");
    let budget=document.getElementById("budget");
    let valid;
    valid = !!(validateLenght(2, 60, nazwa.value.length) && validateLenght(1, 100, iloscPracownikow.value) && validateLenght(1000, 10000, budget.value));

        nazwa.addEventListener("submit", function (event) {
            if (!(validateLenght(2, 60, nazwa.value.length))) {
                nazwa.setCustomValidity("nazwa musi zawierać 2-60 znaków");
            } else {
                nazwa.setCustomValidity("");
            }
          });
       iloscPracownikow.addEventListener("submit", function (event) {
        if (!(validateLenght(1, 100, iloscPracownikow.value))) {
            iloscPracownikow.setCustomValidity("ilosc musi zawierać 1-100 pracowników");
            console.log('akakaka')
        } else {
            iloscPracownikow.setCustomValidity("asdasd");
            
        }
      });
   budget.addEventListener("submit", function (event) {
    if (!(validateLenght(1000, 10000, budget.value))) {
        budget.setCustomValidity("bużet musi wynosić 1000-10 000");
    } else {
        budget.setCustomValidity("");
    }
  });

    if(!valid)
        document.getElementById("errorText").innerText = "Formularz zawiera błędy";
    else accepted()
    
    return valid;
}
function validateLenght(min,max,value){
    return min <= value && max >= value;
}
function accepted(){
    alert("poprawnie dodano oddział")
}
