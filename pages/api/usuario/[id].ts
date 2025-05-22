// pages/api/usuario/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import {
  getUserById,
  updateUser,
  deleteUser,
} from "@/controllers/user.controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  if (!id) return res.status(400).json({ error: "ID inválido" });

  try {
    switch (req.method) {
      case "GET": {
        const user = await getUserById(id);
        if (!user)
          return res.status(404).json({ error: "Usuario no encontrado" });
        return res.status(200).json(user);
      }

      case "PUT": {
        const { name, email, telefono, password } = req.body;
        const updatedUser = await updateUser(id, {
          name,
          email,
          telefono,
          password,
        });
        return res.status(200).json(updatedUser);
      }

      case "DELETE": {
        try {
          await deleteUser(id);
          return res.status(204).end();
        } catch (err: any) {
          if (err.code === "P2025") {
            return res
              .status(404)
              .json({ error: "Usuario no encontrado o no existente" });
          }
          // log interno de eliminación
          console.error("[API DELETE ERROR]", err);
          return res
            .status(500)
            .json({ error: "Error al eliminar usuario", details: err.message });
        }
      }

      default:
        return res.status(405).json({ error: "Método no permitido" });
    }
  } catch (err: any) {
    // 1) Loguea el error completo en Railway logs
    console.error("[API ERROR] /api/usuario/[id]:", err);
    // 2) Devuelve el mensaje y stack para depurar desde Postman
    return res.status(500).json({
      error: "Error en el servidor",
      message: err.message,
      stack: err.stack,
    });
  }
}
