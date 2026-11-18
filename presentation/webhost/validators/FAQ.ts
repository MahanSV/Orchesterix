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

const getFAQByIdSchema = z.object({
  id: z.string(),
});

const createFAQSchema = z.object({
  question: z.string(),
  answer: z.string(),
  order: z.number(),
});

const updateFAQSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});

const updateFAQOrdersSchema = z.object({
  orders: z.array(
    z.object({
      id: z.string(),
      order: z.number()
    })
  ),
});

const deleteFAQSchema = z.object({
  id: z.string(),
});

export {
  FAQDTOSchema,
  getFAQByIdSchema,
  createFAQSchema,
  updateFAQSchema,
  updateFAQOrdersSchema,
  deleteFAQSchema
}