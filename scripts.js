let calculoGanancias = () => {
    let porcentajeAnual = 0.75;
    let monto = Number(document.getElementById("monto").value);
    let meses = document.getElementsByName("meses");
    let cantidadMeses = 0 ;
    for (mes of meses) {
        if (mes.checked) {
            cantidadMeses = Number(mes.value);
        }
    }

    let interesGanado = ((monto * porcentajeAnual) / 12) * cantidadMeses;
    let gananciaTotal = monto + interesGanado;
    
    document.getElementById("gananciaTotal").innerHTML = `$${gananciaTotal}`;
    document.getElementById("interesGanado").innerHTML = `Interés ganado: $${interesGanado}`; 
    if (interesGanado >= monto){
        alert('Duplicaras tu inversion');
    }
};



