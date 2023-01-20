class Usuario {
  constructor({ nombre, apellido, edad }) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
  }
}

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

// Login

const crearUsuario = () => {
  let nombreIngresado = document.getElementsByName("nombre").value;
  let apellidoIngresado = document.getElementsByName("apellido").value;
  let edadIngresada = Number(document.getElementById("edad").value);

  if (edadIngresada < 18) {
    alert("Debes ser mayor de edad para ingresar");
  } else {
    const usuario = new Usuario({
      nombre: nombreIngresado,
      apellido: apellidoIngresado,
      edad: edadIngresada,
    });
    document.getElementById("login").className = "d-none";
    document.getElementById("simulador").className = "d-flex";
  }
};

const calculoGanancias = () => {
  let mesesIngresados = document.getElementsByName("meses");
  let montoIngresado = Number(document.getElementById("monto").value);
  let cantidadMeses = 0;

  for (mes of mesesIngresados) {
    if (mes.checked) {
      cantidadMeses = Number(mes.value);
    }
  }

  const inversion = new Inversion({
    monto: montoIngresado,
    meses: cantidadMeses,
  });

  let gananciaTotal = inversion.calcularGananciaTotal();
  let interesGanado = inversion.calcularInteresGanado();

  document.getElementById("gananciaTotal").innerHTML = `$${gananciaTotal}`;
  document.getElementById(
    "interesGanado"
  ).innerHTML = `Interés ganado: $${interesGanado}`;
  if (interesGanado > inversion.monto) {
    alert("El monto que ganaras sera mayor a tu inversion");
  }
};

// Tabla de inversiones

let inversiones = [];

const agregarInversion = () => {
    let monto = document.getElementById("monto").value;
    let interes = document.getElementById("interesGanado").value;
    inversiones.push([monto, interes]);
    document.getElementById("inversiones").innerHTML = `Tienes ${inversiones.length} inversiones`;
};

