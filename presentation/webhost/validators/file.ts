import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);


const uploadUserTicketFileParamsSchema = z.object({
  userId: z.string(),
  ticketId: z.string(),
});

export {
  uploadUserTicketFileParamsSchema,
}