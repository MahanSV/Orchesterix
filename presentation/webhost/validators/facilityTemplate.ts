import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { facilitiesCategoryDTOSchema } from '#webhost/validators/facilitiesCategory.ts';
import { facilityFieldDTOSchema } from '#webhost/validators/facilityField.ts';

extendZodWithOpenApi(z);


const facilityTemplateDTOSchema = z.object({
  id: z.string(),
  value: z.string(),
  key: z.string(),
  order: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  facilitiesCategoryId: z.string(),
  facilitiesCategory: z.lazy((): z.ZodType => facilitiesCategoryDTOSchema)
    .nullable()
    .optional(),
  facilityFields: z.array(z.lazy((): z.ZodType=> facilityFieldDTOSchema))
    .nullable()
    .optional(),
}).openapi('facilityTemplateDTOSchema');

export {
  facilityTemplateDTOSchema,
};