// pages/api/simulador.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { calcularCuota } from "../..//lib/calculos";

type SimuladorRequest = {
  amount: number;
  months: number;
  userId: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { amount, months, userId }: SimuladorRequest = req.body;

  if (!amount || !months || !userId) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const { monthlyFee, totalToPay } = calcularCuota(amount, months);

    const simulacion = await prisma.simulation.create({
      data: {
        amount,
        months,
        monthlyFee,
        totalToPay,
        user: { connect: { id: userId } },
      },
    });

    return res.status(201).json(simulacion);
  } catch (err) {
    return res.status(500).json({ error: "Error al guardar la simulación" });
  }
}
