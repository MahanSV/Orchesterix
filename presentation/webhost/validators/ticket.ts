import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { userDTOSchema } from '#webhost/validators/user.ts';
import { staffDTOSchema } from '#webhost/validators/staff.ts';

extendZodWithOpenApi(z);


const ticketStatus = z.enum(['OPEN', 'IN_PROGRESS', 'WAITING_FOR_USER', 'WAITING_FOR_INTERNAL_UNIT', 'RESOLVED', 'CLOSED', 'CANCELLED']);

const ticketAnswer = z.object({
  staffId: z.string(),
  createdAt: z.date(),
  description: z.string(),
});

const ticketDTOSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  attachment: z.string(),
  answer: ticketAnswer
    .nullable()
    .optional(),
  status: ticketStatus,
  createdAt: z.date(),
  updatedAt: z.date(),
  closedAt: z.date().optional(),
  userId: z.string(),
  staffId: z.string()
    .nullable()
    .optional(),
  user: z.lazy((): z.ZodType => userDTOSchema)
    .nullable()
    .optional(),
  staff: z.lazy((): z.ZodType => staffDTOSchema)
    .nullable()
    .optional(),
}).openapi('ticketDTOSchema');

const createTicketByUserSchema = z.object({
  title: z.string(),
  description: z.string(),
  attachment: z.string(),
});

const ticketAnswerSchema = z.object({
  id: z.string(),
  answerDescription: z.string(),
  staffId: z.string(),
});


export {
  ticketDTOSchema,
  createTicketByUserSchema,
  ticketAnswerSchema,
};