export class Inversion {
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