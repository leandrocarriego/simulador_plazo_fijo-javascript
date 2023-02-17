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
const tablaModal = document.getElementById("cuerpoTablaModal");
const botonCalcular = document.getElementById("btn-calcular");
const botonInvertir = document.getElementById("btn-invertir");

fetch("./js/api/inversionesCobradas.json")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("contadorInversionesCobradas").innerHTML =
      data.length;
    data.forEach((element) => {
      agregarFilasALaTabla(element, tablaModal, [], false);
    });
  })
  .catch((error) => {
    console.log(error);
  });

document.getElementById("contadorInversiones").innerHTML =
  inversionesArray.length;

localStorage.setItem("inversiones", JSON.stringify(inversionesArray));

inversionesArray.forEach((element) => {
  agregarFilasALaTabla(element, tablaInversiones, inversionesArray, true);
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
  const tomaDeInfo = new Promise((resolve, reject) => {
    setTimeout(function timeout() {
      const pedido = inversionActual;
      pedido == undefined ? reject("error") : resolve(pedido);
    }, 1500);
  });

  tomaDeInfo
    .then((data) => {
      inversionAPushear = {
        montoInvertido: data.monto,
        ganancia: data.calcularInteresGanado(),
      };

      inversionesArray.push(inversionAPushear);

      localStorage.setItem("inversiones", JSON.stringify(inversionesArray));

      agregarFilasALaTabla(
        inversionAPushear,
        tablaInversiones,
        inversionesArray,
        true
      );

      setTimeout(function timeout() {
        document.getElementById("contadorInversiones").innerHTML =
          inversionesArray.length;
      }, 1000);

      Swal.fire({
        icon: "success",
        title: "¡Genial!",
        text: "Tu inversion ha sido realizada con exito",
        timer: 2000,
      });
    })
    .catch((e) => {
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "Debes calcular tus ganancias antes de invertir",
        timer: 2000,
      });
    });
};

localStorage.setItem("inversiones", JSON.stringify(inversionesArray));
