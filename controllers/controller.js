"use strict";
var car = new Array();
var j = 0;
function createCar() {
    var plate = document.getElementById("carPlate").value;
    var color = document.getElementById("carColor").value;
    var brand = document.getElementById("carModel").value;
    car[j] = new Car(plate, color, brand);
    document.getElementById("carPlateAdded").innerText += car[j].plate + "\n";
    document.getElementById("carModelAdded").innerText += car[j].brand + "\n";
    document.getElementById("carColorAdded").innerText += car[j].color + "\n";
    // + " WHEELS: " + JSON.stringify(car.wheels);
}
function addCarWheels() {
    var rodaModel = new Array();
    var rodaDiametre = new Array();
    for (var i = 0; i < 4; i++) {
        rodaModel[i] = document.getElementById("rodaModel" + (i + 1)).value;
        rodaDiametre[i] = +document.getElementById("rodaDiametre" + (i + 1)).value;
        car[j].addWheel(new Wheel(rodaDiametre[i], rodaModel[i]));
    }
    for (var i = 1; i <= 4; i++) {
        document.getElementById("rodaModelAdded" + i).innerText += car[j].wheels[i - 1].brand + "\n";
        document.getElementById("rodaDiametreAdded" + i).innerText += String(car[j].wheels[i - 1].diameter) + "\n";
    }
}
var f = document.getElementById("form-car");
f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validatePlate()) {
        createCar();
        document.getElementById("form-car").hidden = true;
        document.getElementById("container-car").hidden = false;
        document.getElementById("form-wheels").hidden = false;
        return false;
    }
    else
        return false;
});
var f2 = document.getElementById("form-wheels");
f2.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateDiametre()) {
        addCarWheels();
        document.getElementById("container-wheels").hidden = false;
        document.getElementById("form-car").hidden = false;
        document.getElementById("form-wheels").hidden = true;
        j++;
        return false;
    }
    else {
        return false;
    }
});
var formCar = document.getElementById('form-car');
function validatePlate() {
    var acumError = 0;
    formCar.classList.remove('is-invalid');
    var inputPlate = document.getElementById("carPlate");
    var plateNum = inputPlate.value.slice(0, 4);
    var plateLetter = inputPlate.value.slice(-3);
    var cause = "";
    var hasNumber = /\d/;
    if (inputPlate.value.length != 7) {
        acumError++;
    }
    else if (isNaN(+plateNum)) {
        acumError++;
    }
    else if (hasNumber.test(plateLetter)) {
        acumError++;
    }
    else if (plateLetter != plateLetter.toUpperCase()) {
        acumError++;
        console.log("hola");
        cause = "Les lletres han de ésser majúscules.";
    }
    if (acumError > 0) {
        document.getElementById("errorPlate").textContent = "El format de la matrícula no és el correcte. " + cause;
        inputPlate.classList.add("is-invalid");
        return false;
    }
    else {
        return true;
    }
}
var formWheels = document.getElementById('form-wheels');
function validateDiametre() {
    var acumError = 0;
    formWheels.classList.remove('is-invalid');
    var diametreInput;
    var diametre;
    for (var i = 0; i < 4; i++) {
        diametreInput = document.getElementById("rodaDiametre" + (i + 1));
        diametre = +diametreInput.value;
        if (isNaN(diametre)) {
            acumError++;
            document.getElementById("errorDiametre" + (i + 1)).textContent = "El diàmetre d'aquesta roda no és un nombre.";
            diametreInput.classList.add("is-invalid");
        }
        else if (!(diametre >= 0.4 && diametre <= 2)) {
            acumError++;
            document.getElementById("errorDiametre" + (i + 1)).textContent = "El diàmetre d'aquesta roda no està entre 0,4 i 2.";
            diametreInput.classList.add("is-invalid");
        }
    }
    if (acumError > 0) {
        return false;
    }
    else {
        return true;
    }
}
