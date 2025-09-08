import { z } from "zod";
import { usernameSchema, emailSchema, passwordSchema } from "./authSchemas";

export const subscriptionSchema = z.object({
  email: emailSchema,
});

const fullnameSchema = z
  .string()
  .regex(/^[A-Za-z]+$/, {
    message: "Fullname can only contain letters",
  })
  .optional();

const avatarSchema = z
  .string()
  .url()
  .regex(/^https?:\/\/.+$/, {
    message: "Avatar must start with http or https",
  })
  .optional();

const websiteSchema = z
  .array(z.string().url({ message: "Website must be a valid URL" }))
  .optional();

const technicalLabelsSchema = z.array(z.string()).optional();

const domainLabelsSchema = z.array(z.string()).optional();

export const locationSchema = z
  .string()
  .regex(/^[A-Za-z\s]{2,50}$/, {
    message: "Location must be a valid name or code",
  })
  .optional();

export const timezoneSchema = z
  .string()
  .regex(/^[A-Za-z]+\/[A-Za-z_]+$/, {
    message: "Timezone must be a valid IANA timezone (e.g., Asia/Seoul)",
  })
  .optional();

const idSchema = z.number();

export const profileSchema = z.object({
  avatar: avatarSchema,
  fullname: fullnameSchema,
  technicalLabels: technicalLabelsSchema,
  domainLabels: domainLabelsSchema,
  website: websiteSchema,
  location: locationSchema,
  timezone: timezoneSchema,
});

export const userInfoSchema = z.object({
  id: idSchema,
  username: usernameSchema,
  email: emailSchema,
});

export const emailInfoSchema = z.object({
  email: emailSchema,
});

export const passwordInfoSchema = z.object({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
  confirmPassword: passwordSchema,
});
