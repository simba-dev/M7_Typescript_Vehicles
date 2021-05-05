let car: Car;
function createCar() {
  let plate: string = (<HTMLInputElement>document.getElementById("carPlate")).value;
  let color: string = (<HTMLInputElement>document.getElementById("carColor")).value;
  let brand: string = (<HTMLInputElement>document.getElementById("carModel")).value;



  car = new Car(plate, color, brand);
  document.getElementById("carPlateAdded")!.innerText = car.plate;
  document.getElementById("carModelAdded")!.innerText = car.brand;
  document.getElementById("carColorAdded")!.innerText = car.color;
  // + " WHEELS: " + JSON.stringify(car.wheels);

}

function addCarWheels() {
  let rodaModel: string[] = new Array();
  let rodaDiametre: number[] = new Array();
  for (let i = 0; i < 4; i++) {
    rodaModel[i] = (<HTMLInputElement>document.getElementById("rodaModel" + (i + 1))).value;
    rodaDiametre[i] = +(<HTMLInputElement>document.getElementById("rodaDiametre" + (i + 1))).value;
    car.addWheel(new Wheel(rodaDiametre[i], rodaModel[i]));
  }

  for (let i = 1; i <= 4; i++) {
    (<HTMLInputElement>document.getElementById("rodaModelAdded" + i)).innerText = car.wheels[i - 1].brand;
    (<HTMLInputElement>document.getElementById("rodaDiametreAdded" + i)).innerText = String(car.wheels[i - 1].diameter);
  }
}


let f = document.getElementById("form-car") as HTMLFormElement;
f.addEventListener('submit', (e: Event) => {

  e.preventDefault();
  if (validatePlate()) {
    createCar();
    (<HTMLFormElement>document.getElementById("form-car")).hidden = true;
    (<HTMLFormElement>document.getElementById("container-car")).hidden = false;
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
    (<HTMLFormElement>document.getElementById("container-wheels")).hidden = false;
    return false;
  } else {
    return false;
  }
})


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
    console.log("hola");
    cause = "Les lletres han de ésser majúscules."
  }
  if (acumError > 0) {
    (<HTMLInputElement>document.getElementById("errorPlate")).textContent = "El format de la matrícula no és el correcte. " + cause;
    inputPlate.classList.add("is-invalid");
    return false;
  } else {
    return true;
  }
}

const formWheels = <HTMLFormElement>document.getElementById('form-wheels');

function validateDiametre() {
  var acumError = 0;
  formWheels.classList.remove('is-invalid');
  var diametreInput;
  var diametre;
  for (let i = 0; i < 4; i++) {
    diametreInput = (<HTMLInputElement>document.getElementById("rodaDiametre" + (i + 1)));
    diametre = +diametreInput.value;
    if (isNaN(diametre)) {
      acumError++;
      (<HTMLInputElement>document.getElementById("errorDiametre"+ (i+1))).textContent = "El diàmetre d'aquesta roda no és un nombre.";
      diametreInput.classList.add("is-invalid");
    } else if (!(diametre >= 0.4 && diametre <= 2)) {
      acumError++;
      (<HTMLInputElement>document.getElementById("errorDiametre"+ (i+1))).textContent = "El diàmetre d'aquesta roda no està entre 0,4 i 2.";
      diametreInput.classList.add("is-invalid");
    }
  }
  if (acumError > 0) {
    return false;
  } else {
    return true;
  }

}
