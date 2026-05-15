import z from "zod";

export const createaccountSchema = z.object({
  name: z
    .string()
    .min(12, { message: "O nome deve ter pelo menos 12 caracteres." })
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, {
      message: "O nome deve ter caracteres válidos.",
    }),
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(8, { message: "A senha deve conter no mínimo 8 caracteres" }),
});
