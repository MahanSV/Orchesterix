import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { bankAccountDTOSchema } from '#webhost/validators/bankAccount.ts';
import { facilityFieldDTOSchema } from '#webhost/validators/facilityField.ts';

extendZodWithOpenApi(z);


const bankAccountFacilityDTOSchema = z.object({
  id: z.string(),
  value: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  bankAccountId: z.string(),
  facilityFieldId: z.string(),
  bankAccount: z.lazy((): z.ZodType => bankAccountDTOSchema)
    .nullable()
    .optional(),
  facilityField: z.lazy((): z.ZodType => facilityFieldDTOSchema)
    .nullable()
    .optional(),
}).openapi('bankAccountFacilityDTOSchema');

export {
  bankAccountFacilityDTOSchema,
};