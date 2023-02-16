export const agregarFilasALaTabla = (inversion, tabla, arrayInversiones) => {
  const index = arrayInversiones.indexOf(inversion);
  const row = document.createElement("tr");
  const botonBorrarInversion = document.createElement("td");
  row.innerHTML = `
    <td>$${inversion.montoInvertido}</td>
    <td>$${inversion.ganancia}</td> 
  `;
  botonBorrarInversion.innerHTML =
    '<button type="button" id="btn-borrar" class="btn btn-danger m-1">Retirar</button>';

  row.append(botonBorrarInversion);
  console.log(arrayInversiones);
  tabla.append(row);
  botonBorrarInversion.onclick = () => {
    Swal.fire({
      title: "¿Seguro que quieres retirar la inversion?",
      text: "Si no se cumplio el plazo fijo no obtendras ganancias",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quiero retirar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Inversion retirada",
          "Se despositara tu dinero en tu caja de ahorro",
          "success"
        );
        row.remove();
        document.getElementById("contadorInversiones").innerHTML -= 1;
        arrayInversiones.splice(index, 1);
        localStorage.setItem("inversiones", JSON.stringify(arrayInversiones));
      }
    });
  };
};
