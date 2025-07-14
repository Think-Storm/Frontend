import { z } from "zod";
import { emailSchema } from "./authSchemas";

export const subscriptionSchema = z.object({
    email: emailSchema,
});
