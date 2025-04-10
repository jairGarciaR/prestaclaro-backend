// pages/api/simulador.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createSimulation } from "@/controllers/simulation.controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { amount, months, userId } = req.body;

  if (!amount || !months || !userId) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  try {
    const simulacion = await createSimulation(
      Number(amount),
      Number(months),
      Number(userId)
    );
    return res.status(201).json(simulacion);
  } catch {
    return res.status(500).json({ error: "Error al crear simulación" });
  }
}
