import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { userDTOSchema } from '#webhost/validators/user.ts';

extendZodWithOpenApi(z);


const userInqueryDTOSchema = z.object({
  id: z.string(),
  point: z.string(),
  guarantees: z.any(),
  totalTurnover: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  user: z.lazy((): z.ZodType => userDTOSchema)
    .nullable()
    .optional(),
}).openapi('userInqueryDTOSchema');

export {
  userInqueryDTOSchema,
};