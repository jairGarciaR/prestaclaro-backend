// lib/calculos.ts
import Decimal from "decimal.js";

/**
 * Calcula cuota mensual y total con precisión decimal absoluta
 */
export function calcularCuota(
  amount: number,
  months: number,
  tasa: number = 0.02
) {
  if (months <= 0 || amount <= 0) {
    throw new Error("Meses y monto deben ser mayores a cero");
  }

  const P = new Decimal(amount);
  const i = new Decimal(tasa);
  const n = new Decimal(months);

  const one = new Decimal(1);
  const denominator = one.minus(one.plus(i).pow(n.neg()));
  const cuota = P.times(i).div(denominator);
  const total = cuota.times(n);

  return {
    monthlyFee: cuota.toDecimalPlaces(2).toNumber(),
    totalToPay: total.toDecimalPlaces(2).toNumber(),
  };
}
