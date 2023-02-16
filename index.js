import { Inversion } from "./js/class/Inversion.js";
import { agregarFilasALaTabla } from "./js/functions.js";

// Variables
let inversionActual;
let gananciaTotal;
let interesGanado;
let montoIngresado;
let mesesSeleccionados;
let inversionAPushear;
let cantidadMeses = 0;
let inversionesArray = JSON.parse(localStorage.getItem("inversiones")) || [];
const tablaInversiones = document.getElementById("cuerpoTabla");
const botonCalcular = document.getElementById("btn-calcular");
const botonInvertir = document.getElementById("btn-invertir");

document.getElementById("contadorInversiones").innerHTML =
  inversionesArray.length;

localStorage.setItem("inversiones", JSON.stringify(inversionesArray));

inversionesArray.forEach((element) => {
  agregarFilasALaTabla(element, tablaInversiones, inversionesArray);
});

botonCalcular.onclick = () => {
  montoIngresado = Number(document.getElementById("monto").value);
  mesesSeleccionados = document.getElementsByName("meses");

  mesesSeleccionados.forEach((mes) => {
    if (mes.checked) {
      cantidadMeses = Number(mes.value);
    }
  });

  inversionActual = new Inversion({
    monto: montoIngresado,
    meses: cantidadMeses,
  });

  gananciaTotal = inversionActual.calcularGananciaTotal();
  interesGanado = inversionActual.calcularInteresGanado();

  document.getElementById("gananciaTotal").innerHTML = gananciaTotal;
  document.getElementById("interesGanadoMostrar").innerHTML = interesGanado;
};

botonInvertir.onclick = () => {
  inversionAPushear = {
    montoInvertido: inversionActual.monto,
    ganancia: inversionActual.calcularInteresGanado(),
  };

  Swal.fire({
    icon: 'success',
    title: '¡Genial!',
    text: 'Tu inversion ha sido realizada con exito',
    timer: 2000
  })

  inversionesArray.push(inversionAPushear);

  localStorage.setItem("inversiones", JSON.stringify(inversionesArray));

  agregarFilasALaTabla(inversionAPushear, tablaInversiones, inversionesArray);

  document.getElementById("contadorInversiones").innerHTML =
    inversionesArray.length;
};

localStorage.setItem("inversiones", JSON.stringify(inversionesArray));
