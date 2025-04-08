// pages/api/simulaciones.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const userId = parseInt(req.query.userId as string);

  if (isNaN(userId)) {
    return res
      .status(400)
      .json({ error: "Parámetro userId requerido y válido" });
  }

  try {
    const simulations = await prisma.simulation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(simulations);
  } catch (err) {
    return res.status(500).json({ error: "Error al obtener simulaciones" });
  }
}
