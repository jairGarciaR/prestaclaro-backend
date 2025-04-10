// pages/api/simulaciones/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import {
  getSimulationById,
  updateSimulation,
  deleteSimulation,
} from "@/controllers/simulation.controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  if (!id) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    switch (req.method) {
      case "GET": {
        const simulacion = await getSimulationById(id);
        if (!simulacion)
          return res.status(404).json({ error: "Simulación no encontrada" });
        return res.status(200).json(simulacion);
      }

      case "PUT": {
        const { amount, months } = req.body;
        if (!amount || !months) {
          return res.status(400).json({ error: "Faltan campos requeridos" });
        }
        const updated = await updateSimulation(id, amount, months);
        return res.status(200).json(updated);
      }

      case "DELETE": {
        try {
          await deleteSimulation(id);
          return res.status(204).end();
        } catch (err: any) {
          if (err.code === "P2025") {
            return res
              .status(404)
              .json({ error: "Simulación no encontrada o no existente" });
          }
          return res
            .status(500)
            .json({ error: "Error al eliminar simulación" });
        }
      }

      default:
        return res.status(405).json({ error: "Método no permitido" });
    }
  } catch {
    return res.status(500).json({ error: "Error en el servidor" });
  }
}
