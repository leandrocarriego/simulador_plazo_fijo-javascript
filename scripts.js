class Usuario {
  constructor({ nombre, apellido, edad }) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.inversionesTotales = [];
  }

  invertir = ( monto, interes) => {
    this.inversionesTotales.push([monto, interes]);
  };

  consultarInversionesDuplicanMontoInicial = () => {
    let inversionesDuplicanMonto = this.inversionesTotales.filter(inversion => inversion[0] < inversion[1]);
    return inversionesDuplicanMonto;
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
let usuario;

const crearUsuario = () => {
  let nombreIngresado = document.getElementsByName("nombre").value;
  let apellidoIngresado = document.getElementsByName("apellido").value;
  let edadIngresada = Number(document.getElementById("edad").value);

  if (edadIngresada < 18) {
    alert("Debes ser mayor de edad para ingresar");
  } else {
    usuario = new Usuario({
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

  document.getElementById("gananciaTotal").innerHTML = gananciaTotal;
  document.getElementById(
    "interesGanadoMostrar"
  ).innerHTML = interesGanado;
  if (interesGanado > inversion.monto) {
    alert("El monto que ganaras sera mayor a tu inversion");
  }
};

const agregarInversion = () => {
  let monto = Number(document.getElementById("monto").value);
  let interes = Number(document.getElementById("interesGanadoMostrar").innerHTML);
  usuario.invertir(monto, interes);
  console.log(usuario.inversionesTotales)
  document.getElementById("inversiones").innerHTML = `Tienes ${usuario.inversionesTotales.length} inversiones`;
};

const consultarInversiones = () => {
  let inversionQueDuplican = usuario.consultarInversionesDuplicanMontoInicial();
  if (inversionQueDuplican.length > 0) {
    let count = 1;
    for (let inversion of inversionQueDuplican) {
      document.getElementById("duplican").innerHTML += `<br> Inversion N°${count}: <br>-monto invertido: $${inversion[0]} <br> 
      -interes ganado: $${inversion[1]}`;
      count++;
    }
  }
} 


