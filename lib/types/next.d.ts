// lib/types/next.d.ts
import type { NextApiRequest } from "next";

declare module "next" {
  interface NextApiRequest {
    user?: any; // O puedes usar un tipo más específico si sabes la estructura del token
  }
}
