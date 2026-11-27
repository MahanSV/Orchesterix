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

const getAllFilteredBankAccountFacilitiesForAdminSchema = z.object({
  nationalId: z.string()
    .min(10,  { error: "کد ملی نمیتواند کمتر از 10 رقم باشد." })
    .max(10,  { error: "کد ملی نمیتواند بیشتر از 10 رقم باشد." })
    .optional()
    .nullable(),

  mobile: z.string()
    .min(12,  { error: "شماره تلفن نمیتواند کمتر از 12 رقم باشد." })
    .max(12,  { error: "شماره تلفن نمیتواند بیشتر از 12 رقم باشد." })
    .optional()
    .nullable(),

  page: z.number().min(1, { error: "نمیتوان صفحه کمتر از 1 انتخاب کرد."}),

  limit: z.number().min(1).max(50, { error: "تعداد آیتم های درخواستی نمیتواند بیشتر از 50 تا همزمان باشد." }) ,

  sortOrder: z.enum(['asc', 'desc'], { error: "ترتیب باید یکی از مقادیر asc یا desc باشد"}),
});

const getAllFilteredBankAccountFacilitiesForAdminResponseSchema= z.object({
  bankAccountFacilities: z.array(bankAccountFacilityDTOSchema),
  total: z.number(),
  page: z.number(),
  totalPages: z.number(),
});

const createBankAccountFacilitySchema = z.object({
  userId: z.string(),
  facilityTemplateId: z.string(),
  data: z.array(
    z.object({
      value: z.string(),
      bankAccountId: z.string(),
      facilityFieldId: z.string(),
    })
  )
});

export {
  bankAccountFacilityDTOSchema,
  getAllFilteredBankAccountFacilitiesForAdminSchema,
  getAllFilteredBankAccountFacilitiesForAdminResponseSchema,
  createBankAccountFacilitySchema,
};