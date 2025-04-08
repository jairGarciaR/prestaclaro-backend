// pages/api/usuario/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = parseInt(req.query.id as string);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    switch (req.method) {
      case "GET":
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user)
          return res.status(404).json({ error: "Usuario no encontrado" });
        return res.status(200).json(user);

      case "PUT":
        const { name, email } = req.body;
        if (!name && !email) {
          return res.status(400).json({ error: "Nada que actualizar" });
        }
        const updated = await prisma.user.update({
          where: { id: userId },
          data: { name, email },
        });
        return res.status(200).json(updated);

      case "DELETE":
        await prisma.user.delete({ where: { id: userId } });
        return res.status(204).end();

      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return res
          .status(405)
          .json({ error: `Método ${req.method} no permitido` });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error en el servidor" });
  }
}
