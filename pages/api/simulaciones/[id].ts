// pages/api/simulaciones/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { calcularCuota } from "../../../lib/calculos";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const simId = parseInt(req.query.id as string);

  if (isNaN(simId)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    switch (req.method) {
      case "GET":
        const simulacion = await prisma.simulation.findUnique({
          where: { id: simId },
        });
        if (!simulacion)
          return res.status(404).json({ error: "Simulación no encontrada" });
        return res.status(200).json(simulacion);

      case "PUT":
        const { amount, months } = req.body;
        if (!amount || !months) {
          return res
            .status(400)
            .json({ error: "Faltan campos: amount o months" });
        }

        const { monthlyFee, totalToPay } = calcularCuota(amount, months);

        const updated = await prisma.simulation.update({
          where: { id: simId },
          data: {
            amount,
            months,
            monthlyFee,
            totalToPay,
          },
        });

        return res.status(200).json(updated);

      case "DELETE":
        await prisma.simulation.delete({ where: { id: simId } });
        return res.status(204).end();

      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return res
          .status(405)
          .json({ error: `Método ${req.method} no permitido` });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error al procesar la solicitud" });
  }
}
