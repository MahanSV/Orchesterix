import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { facilityTemplateDTOSchema } from '#webhost/validators/facilityTemplate.ts';

extendZodWithOpenApi(z);


const facilitiesCategoryDTOSchema = z.object({
  id: z.string(),
  name: z.string(),
  key: z.string(),
  order: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  facilityTemplates: z.array(z.lazy((): z.ZodType => facilityTemplateDTOSchema))
    .nullable()
    .optional(),
}).openapi('facilitiesCategoryDTOSchema');

const getFacilitiesCategoryByIdSchema = z.object({
  id: z.string(),
});

export {
  facilitiesCategoryDTOSchema,
  getFacilitiesCategoryByIdSchema,
};