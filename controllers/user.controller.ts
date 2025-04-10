import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const registerUser = async (body: any) => {
  const { name, email, telefono, password } = body;
  if (!name || !email || !telefono || !password) throw "Faltan campos";

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw "Email ya registrado";

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, telefono, password: hashed },
  });

  return user;
};

export const loginUser = async (body: any) => {
  const { email, password } = body;
  if (!email || !password) throw "Faltan campos";

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw "Usuario no encontrado";

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw "Credenciales inválidas";

  const token = jwt.sign(
    { userId: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      telefono: user.telefono,
    },
  };
};

export const getUserFromDB = async (userId: number) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      telefono: true,
      createdAt: true,
    },
  });
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      telefono: true,
      createdAt: true,
    },
  });
};

export const updateUser = async (
  id: number,
  data: { name?: string; email?: string; telefono?: string; password?: string }
) => {
  const updateData: any = {};
  if (data.name) updateData.name = data.name;
  if (data.email) updateData.email = data.email;
  if (data.telefono) updateData.telefono = data.telefono;
  if (data.password) updateData.password = await bcrypt.hash(data.password, 10);

  return prisma.user.update({
    where: { id },
    data: updateData,
  });
};

export const deleteUser = async (id: number) => {
  return prisma.user.delete({ where: { id } });
};
