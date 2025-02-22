import { z } from "zod";

const adminAuthValidator = z.object({
  email: z.string(),
  password: z.string()
});

const refreshTokensValidator = z.object({
  refreshToken: z.string(),
});

const passwordResetValidator = z.object({
  token: z.string(),
  password: z.string().min(6)
})
type IAdminLoginDTO = z.infer<typeof adminAuthValidator>
type IPasswordResetDTO = z.infer<typeof passwordResetValidator>
export { adminAuthValidator, refreshTokensValidator, IAdminLoginDTO, IPasswordResetDTO, passwordResetValidator };
