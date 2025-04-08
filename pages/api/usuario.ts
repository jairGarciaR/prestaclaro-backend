// pages/api/usuario.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

type CreateUserRequest = {
  email: string;
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { email, name }: CreateUserRequest = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return res.status(201).json(user);
  } catch (err: any) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "El email ya existe" });
    }

    return res.status(500).json({ error: "Error al crear usuario" });
  }
}
