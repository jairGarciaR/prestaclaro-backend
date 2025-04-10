import type { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "@/lib/middleware/auth";
import { prisma } from "@/lib/prisma";
import { JwtPayload } from "jsonwebtoken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req;

  if (!user || typeof user === "string") {
    return res.status(401).json({ error: "Token inválido" });
  }

  const { userId } = user as JwtPayload;

  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      telefono: true,
      createdAt: true,
    },
  });

  if (!dbUser) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  return res.status(200).json({ user: dbUser });
};

export default authenticate(handler);
