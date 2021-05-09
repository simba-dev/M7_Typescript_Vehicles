"use strict";
var car = new Array();
var j = 0;
var f = document.getElementById("form-car");
f.addEventListener('submit', function (e) {
    e.preventDefault();
    var inputModel = document.getElementById("carModel");
    var inputColor = document.getElementById("carColor");
    if (validatePlate() && validateEmpty(inputModel) && validateEmpty(inputColor)) {
        createCar();
        showCar();
        document.getElementById("form-car").hidden = true;
        // (<HTMLFormElement>document.getElementById("container-car")).hidden = false;
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
        showWheels();
        // (<HTMLFormElement>document.getElementById("container-wheels")).hidden = false;
        document.getElementById("form-car").hidden = false;
        document.getElementById("form-wheels").hidden = true;
        j++;
        return false;
    }
    else {
        return false;
    }
});
function createCar() {
    var plate = document.getElementById("carPlate").value;
    var color = document.getElementById("carColor").value;
    var brand = document.getElementById("carModel").value;
    car[j] = new Car(plate, color, brand);
}
function showCar() {
    var divContainerShow = "<div class=\"container\" id=\"container-show-" + j + "\"></div>";
    document.getElementById('container-show').innerHTML += divContainerShow;
    var divContainerCar = "<div class=\"container\" id=\"container-car-" + j + "\"></div>";
    document.getElementById('container-show-' + j).innerHTML += divContainerCar;
    var html = "<h3> Cotxe " + (j + 1) + "</h3>";
    html += "<div class=\"row\">";
    html += "<div class=\"col-12 col-md-4 mb-3\">";
    html += "<div class=\"card\"> ";
    html += "<div class=\"card-body\"> ";
    html += "<h5 class=\"card-title\">Matrícula</h5> ";
    html += "<p id=\"carPlateAdded" + j + "\"></p>";
    html += "</div></div></div>";
    html += "<div class=\"col-12 col-md-4 mb-3\">";
    html += "<div class=\"card\"> ";
    html += "<div class=\"card-body\"> ";
    html += "<h5 class=\"card-title\">Marca</h5> ";
    html += "<p id=\"carModelAdded" + j + "\"></p>";
    html += "</div></div></div>";
    html += "<div class=\"col-12 col-md-4 mb-3\">";
    html += "<div class=\"card\"> ";
    html += "<div class=\"card-body\"> ";
    html += "<h5 class=\"card-title\">Color</h5> ";
    html += "<p id=\"carColorAdded" + j + "\"></p>";
    html += "</div></div></div>";
    html += "</div>";
    document.getElementById('container-car-' + j).innerHTML += html;
    document.getElementById("carPlateAdded" + j).innerText += car[j].plate + "\n";
    document.getElementById("carModelAdded" + j).innerText += car[j].brand + "\n";
    document.getElementById("carColorAdded" + j).innerText += car[j].color + "\n";
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
}
function showWheels() {
    var html = "";
    var divContainerWheels = "<div class=\"container\" id=\"container-wheels-" + j + "\"></div>";
    document.getElementById('container-show-' + j).innerHTML += divContainerWheels;
    html += "<div class=\"row\" id=\"container-wheels2-" + j + "\">";
    document.getElementById('container-wheels-' + j).innerHTML += html;
    for (var i = 1; i <= 4; i++) {
        html = "<div class=\"col-12 col-sm-6 col-md-3 mb-3\">";
        html += "<div class=\"card\"> ";
        html += "<div class=\"card-body\"> ";
        html += "<h5 class=\"card-title\">Marca de Roda " + i + "</h5> ";
        html += "<p id=\"rodaModelAdded" + j + "-" + i + "\"></p>";
        html += "</div></div></div>";
        html += "<div class=\"col-12 col-sm-6 col-md-3 mb-3\">";
        html += "<div class=\"card\"> ";
        html += "<div class=\"card-body\"> ";
        html += "<h5 class=\"card-title\">Diàmetre de Roda " + i + "</h5> ";
        html += "<p id=\"rodaDiametreAdded" + j + "-" + i + "\"></p>";
        html += "</div></div></div>";
        document.getElementById('container-wheels2-' + j).innerHTML += html;
        document.getElementById("rodaModelAdded" + j + "-" + (i)).innerText += car[j].wheels[i - 1].brand;
        document.getElementById("rodaDiametreAdded" + j + "-" + (i)).innerText += String(car[j].wheels[i - 1].diameter);
    }
    html = "</div>";
    document.getElementById('container-wheels-' + j).innerHTML += html;
}
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
        cause = "Les lletres han de ésser majúscules.";
    }
    if (acumError > 0) {
        document.getElementById("errorPlate").textContent = "El format de la matrícula no és el correcte. " + cause;
        inputPlate.classList.add("is-invalid");
        return false;
    }
    else {
        inputPlate.classList.remove("is-invalid");
        return true;
    }
}
var formWheels = document.getElementById('form-wheels');
function validateDiametre() {
    var acumError = 0;
    formWheels.classList.remove('is-invalid');
    var modelInput;
    var diametreInput;
    var diametre;
    for (var i = 0; i < 4; i++) {
        modelInput = document.getElementById("rodaModel" + (i + 1));
        diametreInput = document.getElementById("rodaDiametre" + (i + 1));
        validateEmpty(modelInput);
        diametre = +diametreInput.value;
        // Validació del diàmetre
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
        else {
            diametreInput.classList.remove("is-invalid");
        }
    }
    if (acumError > 0) {
        return false;
    }
    else {
        return true;
    }
}
function validateEmpty(inputText) {
    formCar.classList.remove('is-invalid');
    if (inputText.value.length == 0) {
        inputText.classList.add("is-invalid");
        return false;
    }
    else {
        inputText.classList.remove("is-invalid");
        return true;
    }
}
