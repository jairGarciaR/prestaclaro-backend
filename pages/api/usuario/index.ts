import type { NextApiRequest, NextApiResponse } from "next";
import { registerUser } from "@/controllers/user.controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método no permitido" });

  try {
    const result = await registerUser(req.body);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(401).json({ error: err.toString() });
  }
}
