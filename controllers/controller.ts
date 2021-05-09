let car: Car[] = new Array();
var j = 0;


let f = document.getElementById("form-car") as HTMLFormElement;
f.addEventListener('submit', (e: Event) => {

  e.preventDefault();
  var inputModel = (<HTMLInputElement>document.getElementById("carModel"));
  var inputColor = (<HTMLInputElement>document.getElementById("carColor"));
  if (validatePlate()&&validateEmpty(inputModel)&&validateEmpty(inputColor)) {
    createCar();

    showCar();
    (<HTMLFormElement>document.getElementById("form-car")).hidden = true;
    // (<HTMLFormElement>document.getElementById("container-car")).hidden = false;
    (<HTMLFormElement>document.getElementById("form-wheels")).hidden = false;

    return false;
  } else
    return false;
}
)

let f2 = document.getElementById("form-wheels") as HTMLFormElement;
f2.addEventListener('submit', (e: Event) => {

  e.preventDefault();
  if (validateDiametre()) {
    addCarWheels();
    showWheels();
    // (<HTMLFormElement>document.getElementById("container-wheels")).hidden = false;
    (<HTMLFormElement>document.getElementById("form-car")).hidden = false;
    (<HTMLFormElement>document.getElementById("form-wheels")).hidden = true;
    j++;
    return false;
  } else {
    return false;
  }
})


function createCar() {
  let plate: string = (<HTMLInputElement>document.getElementById("carPlate")).value;
  let color: string = (<HTMLInputElement>document.getElementById("carColor")).value;
  let brand: string = (<HTMLInputElement>document.getElementById("carModel")).value;
  car[j] = new Car(plate, color, brand);
}
function showCar(){
  var divContainerShow = "<div class=\"container\" id=\"container-show-" + j + "\"></div>";
  (<HTMLDivElement>document.getElementById('container-show')).innerHTML += divContainerShow; 
  var divContainerCar = "<div class=\"container\" id=\"container-car-" + j + "\"></div>";
  (<HTMLDivElement>document.getElementById('container-show-' + j)).innerHTML += divContainerCar; 
  var html = "<h3> Cotxe " + (j+1) + "</h3>" ;
    html += "<div class=\"row\">"
        html += "<div class=\"col-12 col-md-4 mb-3\">";
      html += "<div class=\"card\"> ";
      html += "<div class=\"card-body\"> ";
      html += "<h5 class=\"card-title\">Matrícula</h5> ";
      html += "<p id=\"carPlateAdded"+j+"\"></p>";
      html += "</div></div></div>";
      html += "<div class=\"col-12 col-md-4 mb-3\">";
      html += "<div class=\"card\"> ";
      html += "<div class=\"card-body\"> ";
      html += "<h5 class=\"card-title\">Marca</h5> ";
      html += "<p id=\"carModelAdded"+j+"\"></p>";
      html += "</div></div></div>";
      html += "<div class=\"col-12 col-md-4 mb-3\">";
      html += "<div class=\"card\"> ";
      html += "<div class=\"card-body\"> ";
      html += "<h5 class=\"card-title\">Color</h5> ";
      html += "<p id=\"carColorAdded"+j+"\"></p>";
      html += "</div></div></div>";
    html += "</div>";
    (<HTMLDivElement>document.getElementById('container-car-'+j)).innerHTML += html; 
  document.getElementById("carPlateAdded"+j)!.innerText +=   car[j].plate + "\n";
  document.getElementById("carModelAdded"+j)!.innerText +=  car[j].brand + "\n";
  document.getElementById("carColorAdded"+j)!.innerText +=  car[j].color + "\n";
  // + " WHEELS: " + JSON.stringify(car.wheels);
}

function addCarWheels() {
  let rodaModel: string[] = new Array();
  let rodaDiametre: number[] = new Array();
  for (let i = 0; i < 4; i++) {
    rodaModel[i] = (<HTMLInputElement>document.getElementById("rodaModel" + (i + 1))).value;
    rodaDiametre[i] = +(<HTMLInputElement>document.getElementById("rodaDiametre" + (i + 1))).value;
    car[j].addWheel(new Wheel(rodaDiametre[i], rodaModel[i]));
  } 
}

function showWheels() {
  var html = "";
  var divContainerWheels = "<div class=\"container\" id=\"container-wheels-" + j +"\"></div>";
  (<HTMLDivElement>document.getElementById('container-show-' + j)).innerHTML += divContainerWheels; 
    html += "<div class=\"row\" id=\"container-wheels2-" + j +"\">";
    (<HTMLDivElement>document.getElementById('container-wheels-' + j)).innerHTML += html; 
    for (var i = 1; i <= 4; i++) {
      html = "<div class=\"col-12 col-sm-6 col-md-3 mb-3\">";
      html += "<div class=\"card\"> ";
      html += "<div class=\"card-body\"> ";
      html += "<h5 class=\"card-title\">Marca de Roda "+ i +"</h5> ";
      html += "<p id=\"rodaModelAdded" + j + "-" + i + "\"></p>";
      html += "</div></div></div>";
      html += "<div class=\"col-12 col-sm-6 col-md-3 mb-3\">";
      html += "<div class=\"card\"> ";
      html += "<div class=\"card-body\"> ";
      html += "<h5 class=\"card-title\">Diàmetre de Roda "+ i +"</h5> ";
      html += "<p id=\"rodaDiametreAdded" + j + "-" + i + "\"></p>";
      html += "</div></div></div>";
      (<HTMLDivElement>document.getElementById('container-wheels2-' + j)).innerHTML += html; 
      (<HTMLInputElement>document.getElementById("rodaModelAdded" + j + "-" + (i))).innerText += car[j].wheels[i-1].brand;
      (<HTMLInputElement>document.getElementById("rodaDiametreAdded" + j + "-" + (i))).innerText +=  String(car[j].wheels[i-1].diameter);
    }
    html = "</div>";
    (<HTMLDivElement>document.getElementById('container-wheels-' + j)).innerHTML += html;   
}




const formCar = <HTMLFormElement>document.getElementById('form-car');


function validatePlate() {
  var acumError = 0;
  formCar.classList.remove('is-invalid');
  var inputPlate = (<HTMLInputElement>document.getElementById("carPlate"));
  const plateNum = inputPlate.value.slice(0, 4);
  const plateLetter = inputPlate.value.slice(-3);
  var cause = "";
  var hasNumber = /\d/;
  if (inputPlate.value.length != 7) {
    acumError++;
  } else if (isNaN(+plateNum)) {
    acumError++;
  } else if (hasNumber.test(plateLetter)) {
    acumError++;
  } else if (plateLetter != plateLetter.toUpperCase()) {
    acumError++;
    cause = "Les lletres han de ésser majúscules."
  }
  if (acumError > 0) {
    (<HTMLInputElement>document.getElementById("errorPlate")).textContent = "El format de la matrícula no és el correcte. " + cause;
    inputPlate.classList.add("is-invalid");
    return false;
  } else {
    inputPlate.classList.remove("is-invalid");
    return true;
  }
}

const formWheels = <HTMLFormElement>document.getElementById('form-wheels');

function validateDiametre() {
  var acumError = 0;
  formWheels.classList.remove('is-invalid');
  var modelInput;
  var diametreInput;
  var diametre;
  for (let i = 0; i < 4; i++) {
    modelInput = (<HTMLInputElement>document.getElementById("rodaModel" + (i + 1)));
    diametreInput = (<HTMLInputElement>document.getElementById("rodaDiametre" + (i + 1)));

    validateEmpty(modelInput);
    diametre = +diametreInput.value;
    // Validació del diàmetre
    if (isNaN(diametre)) {
      acumError++;
      (<HTMLInputElement>document.getElementById("errorDiametre" + (i + 1))).textContent = "El diàmetre d'aquesta roda no és un nombre.";
      diametreInput.classList.add("is-invalid");
    } else if (!(diametre >= 0.4 && diametre <= 2)) {
      acumError++;
      (<HTMLInputElement>document.getElementById("errorDiametre" + (i + 1))).textContent = "El diàmetre d'aquesta roda no està entre 0,4 i 2.";
      diametreInput.classList.add("is-invalid");
    }
    else {
      diametreInput.classList.remove("is-invalid");
    }
  }
  if (acumError > 0) {
    return false;
  } else {
    return true;
  }

}


function validateEmpty(inputText: HTMLInputElement) {
  formCar.classList.remove('is-invalid');
  
  if(inputText.value.length==0){
    inputText.classList.add("is-invalid");
    return false;
  }else{
    inputText.classList.remove("is-invalid");
    return true;
  }
}
