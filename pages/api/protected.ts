import type { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "@/lib/middleware/auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({
    message: "Ruta protegida accedida correctamente",
    user: req.user,
  });
};

export default authenticate(handler);
