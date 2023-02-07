// Clases

// class Usuario {
//   constructor({ nombre, apellido, edad }) {
//     this.nombre = nombre;
//     this.apellido = apellido;
//     this.edad = edad;
//     this.inversionesTotales = [];
//   };


//   invertir = ( monto, interes) => {
//     this.inversionesTotales.push([monto, interes]);
//   };

//   consultarInversionesDuplicanMontoInicial = () => {
//     let inversionesDuplicanMonto = this.inversionesTotales.filter(inversion => inversion[0] < inversion[1]);
//     return inversionesDuplicanMonto;
//   }

// }

class Inversion {
  constructor({ monto, meses }) {
    this.monto = monto;
    this.meses = meses;
  }

  calcularInteresGanado() {
    const porcentajeAnual = 0.75;
    return ((this.monto * porcentajeAnual) / 12) * this.meses;
  }

  calcularGananciaTotal() {
    return this.monto + this.calcularInteresGanado();
  }
}

// Variables
let inversiones = JSON.parse(localStorage.getItem('inversiones'));
let inversionActual;
let gananciaTotal;
let interesGanado;

// Funciones
const agregarFilasALaTabla = (inversion) => {
  const row = document.createElement('tr');
  row.innerHTML =  `
  <td>${inversion.monto}</td>
  <td>${inversion.calcularInteresGanado()}</td>
  `;

  const botonBorrarInversion = document.createElement('td');
  botonBorrarInversion.innerHTML = '<button class="btn btn-danger">Retirar inversion</button>';
  botonBorrarInversion.addEventListener('click', () => {
    row.remove();
  });

  row.append(botonBorrarInversion);
}


if (inversiones == null) {
  inversiones = [];
}

document.getElementById("inversiones").innerHTML = `Tienes ${inversiones.length} inversiones`;

// Calcular plazo fijo
const botonCalcular = document.getElementById('btn-calcular');



botonCalcular.onclick = () => {
  let mesesIngresados = document.getElementsByName("meses");
  let montoIngresado = Number(document.getElementById("monto").value);
  let cantidadMeses = 0;

  for (mes of mesesIngresados) {
    if (mes.checked) {
      cantidadMeses = Number(mes.value);
    }
  }

  inversionActual = new Inversion({
    monto: montoIngresado,
    meses: cantidadMeses,
  });

  gananciaTotal = inversionActual.calcularGananciaTotal();
  interesGanado = inversionActual.calcularInteresGanado();

  document.getElementById("gananciaTotal").innerHTML = gananciaTotal;
  document.getElementById(
    "interesGanadoMostrar"
  ).innerHTML = interesGanado;
};

// Agregar inversion
const botonInvertir = document.getElementById('btn-invertir');


botonInvertir.onclick = () => {
  inversiones.push({
    inversion: inversionActual.monto,
    ganancia: inversionActual.calcularInteresGanado()
  })
  document.getElementById("inversiones").innerHTML = `Tienes ${inversiones.length} inversiones`;
  localStorage.setItem('inversiones', JSON.stringify(inversiones));
};




