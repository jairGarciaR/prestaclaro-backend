import type { NextApiRequest, NextApiResponse } from "next";
import { listSimulationsByUser } from "@/controllers/simulation.controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Método no permitido" });

  const userId = Number(req.query.userId);
  if (!userId) return res.status(400).json({ error: "Falta userId" });

  try {
    const result = await listSimulationsByUser(userId);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: "Error al obtener simulaciones" });
  }
}
