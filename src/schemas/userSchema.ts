import { z } from "zod";
import { emailSchema } from "./authSchemas";

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
  .string()
  .url({ message: "Website must be a valid URL" })
  .optional();

const technicalLabelsSchema = z.array(z.string()).optional();

const domainLabelsSchema = z.array(z.string()).optional();

export const profileSchema = z.object({
  avatar: avatarSchema,
  fullname: fullnameSchema,
  technicalLabels: technicalLabelsSchema,
  domainLabels: domainLabelsSchema,
  website: websiteSchema,
});
