import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { userDTOSchema } from '#webhost/validators/user.ts';
import { bankAccountFacilityDTOSchema } from '#webhost/validators/bankAccountFacility.ts';

extendZodWithOpenApi(z);


const bankAccountType = z.enum(['CURRENT', 'QARZ_AL_HASAN_SAVINGS', 'SHORT_TERM_ORDINARY', 'SHORT_TERM_SPECIAL', 'LONG_TERM']);
const bankAccountStatus = z.enum(['ACTIVE', 'INACTIVE', 'DORMANT', 'BLOCKED', 'PENDING_ACTIVATION', 'CLOSED']);

const bankAccountDTOSchema = z.object({
  id: z.string(),
  accountHolderName: z.string(),
  shebaId: z.string(),
  cardNumber: z.string(),
  branchCode: z.string(),
  branchName: z.string(),
  turnover: z.string(),
  type: bankAccountType,
  status: bankAccountStatus,
  score: z.string(),
  userId: z.string(),
  user: z.lazy((): z.ZodType => userDTOSchema)
    .nullable()
    .optional(),
  bankAccountFacilities: z.array(z.lazy((): z.ZodType => bankAccountFacilityDTOSchema))
    .nullable()
    .optional(),
}).openapi('bankAccountDTOSchema');

export {
  bankAccountDTOSchema,
};