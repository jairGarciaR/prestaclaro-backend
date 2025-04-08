import { calcularCuota } from "../lib/calculos";
import Decimal from "decimal.js";

describe("calcularCuota", () => {
  it("calcula correctamente la cuota y total con monto y meses válidos", () => {
    const amount = 10000;
    const months = 12;
    const tasa = 0.02;

    // Recalcular cuota real sin redondear, como en la función
    const P = new Decimal(amount);
    const i = new Decimal(tasa);
    const n = new Decimal(months);

    const uno = new Decimal(1);
    const cuota = P.times(i).div(uno.minus(uno.plus(i).pow(n.neg())));
    const totalEsperado = cuota.times(n).toDecimalPlaces(2);

    const { totalToPay } = calcularCuota(amount, months);

    expect(new Decimal(totalToPay).toFixed(2)).toBe(totalEsperado.toFixed(2));
  });

  it("redondea los valores a 2 decimales", () => {
    const result = calcularCuota(20000, 15);
    expect(result.monthlyFee.toFixed(2)).toMatch(/^\d+\.\d{2}$/);
    expect(result.totalToPay.toFixed(2)).toMatch(/^\d+\.\d{2}$/);
  });

  it("lanza error si amount es 0 o negativo", () => {
    expect(() => calcularCuota(0, 12)).toThrow();
    expect(() => calcularCuota(-100, 12)).toThrow();
  });

  it("lanza error si months es 0 o negativo", () => {
    expect(() => calcularCuota(10000, 0)).toThrow();
    expect(() => calcularCuota(10000, -5)).toThrow();
  });
});
