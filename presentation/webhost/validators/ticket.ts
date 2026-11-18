import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { userDTOSchema } from '#webhost/validators/user.ts';
import { staffDTOSchema } from '#webhost/validators/staff.ts';

extendZodWithOpenApi(z);


const ticketStatus = z.enum(['OPEN', 'IN_PROGRESS', 'WAITING_FOR_USER', 'WAITING_FOR_INTERNAL_UNIT', 'RESOLVED', 'CLOSED', 'CANCELLED']);

const ticketDTOSchema = z.object({
  id: z.string(),
  description: z.string(),
  attachment: z.string(),
  status: ticketStatus,
  createdAt: z.date(),
  updatedAt: z.date(),
  closedAt: z.date().optional(),
  userId: z.string(),
  staffId: z.string(),
  user: z.lazy((): z.ZodType => userDTOSchema)
    .nullable()
    .optional(),
  staff: z.lazy((): z.ZodType => staffDTOSchema)
    .nullable()
    .optional(),
}).openapi('ticketDTOSchema');

export {
  ticketDTOSchema,
};