// controllers/simulation.controller.ts
import { prisma } from "@/lib/prisma";
import { calcularCuota } from "@/lib/calculos";

export const createSimulation = async (
  amount: number,
  months: number,
  userId: number
) => {
  const { monthlyFee, totalToPay } = calcularCuota(amount, months);

  return prisma.simulation.create({
    data: {
      amount,
      months,
      monthlyFee,
      totalToPay,
      userId,
    },
  });
};

export const listSimulationsByUser = async (userId: number) => {
  return prisma.simulation.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const getSimulationById = async (id: number) => {
  return prisma.simulation.findUnique({ where: { id } });
};

export const updateSimulation = async (
  id: number,
  amount: number,
  months: number
) => {
  const { monthlyFee, totalToPay } = calcularCuota(amount, months);

  return prisma.simulation.update({
    where: { id },
    data: {
      amount,
      months,
      monthlyFee,
      totalToPay,
    },
  });
};

export const deleteSimulation = async (id: number) => {
  return prisma.simulation.delete({ where: { id } });
};
