import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { facilityTemplateDTOSchema } from '#webhost/validators/facilityTemplate.ts';
import { bankAccountFacilityDTOSchema } from '#webhost/validators/bankAccountFacility.ts';

extendZodWithOpenApi(z);


const facilityFieldDTOSchema = z.object({
  id: z.string(),
  value: z.string(),
  facilityTemplateId: z.string(),
  facilityTemplate: z.lazy((): z.ZodType => facilityTemplateDTOSchema)
    .nullable()
    .optional(),
  bankAccountFacilities : z.array(z.lazy((): z.ZodType => bankAccountFacilityDTOSchema))
    .nullable()
    .optional(),
}).openapi('facilityFieldDTOSchema');

export {
  facilityFieldDTOSchema,
};