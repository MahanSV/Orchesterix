import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);


const FAQDTOSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  order: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
}).openapi('FAQDTOSchema');

export {
  FAQDTOSchema,
}