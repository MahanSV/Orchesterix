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
  attachment: z.string()
    .nullable()
    .optional(),
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
  userId: z.string(),
  title: z.string(),
  description: z.string(),
});

const ticketAnswerSchema = z.object({
  id: z.string(),
  answerDescription: z.string(),
  staffId: z.string(),
});

const changeTitleAndDescriptionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

const deleteTicketSchema = z.object({
  id: z.string(),
});

const getTicketByIdSchema = z.object({
  id: z.string(),
});

const getAllTicketsWithFilterSchema = z.object({
  status: ticketStatus.optional(),
  search: z.string().optional(),
  page: z.number().min(1, 'نمیتوان کمتر از یک صفحه درخواست کرد.').optional().default(1),
  limit: z.number().max(50, 'نمیتوان همزمان بیش از 50 تیکت در یک صفحه درخواست کرد.').optional().default(10),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

const getAllTicketsWithFilterResponseSchema = z.object({
  tickets: z.array(ticketDTOSchema),
  total: z.number(),
  page: z.number(),
  totalPages: z.number(),
});

const changeTicketStatusSchema = z.object({
  id: z.string(),
  status: ticketStatus
});

const staffClosingTicketSchema = z.object({
  id: z.string(),
  staffId: z.string(),
});

export {
  ticketDTOSchema,
  createTicketByUserSchema,
  ticketAnswerSchema,
  changeTitleAndDescriptionSchema,
  deleteTicketSchema,
  getTicketByIdSchema,
  getAllTicketsWithFilterSchema,
  getAllTicketsWithFilterResponseSchema,
  changeTicketStatusSchema,
  staffClosingTicketSchema,
};