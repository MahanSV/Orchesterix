import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { bankAccountDTOSchema } from '#webhost/validators/bankAccount.ts';
import { ticketDTOSchema } from '#webhost/validators/ticket.ts';
import { userInqueryDTOSchema } from '#webhost/validators/userInquery.ts';

extendZodWithOpenApi(z);


const userStatus = z.enum(['Active', 'Inactive']);

const createUserSchema = z.object({
    name: z.string({ error: "name is required." }).min(1, { error: "name is required." }),
    lastName: z.string({ error: "lastName is required." }).min(1, { error: "lastName is required." }),
    nationalId: z.string({ error: "nationalId is required." }).min(1, { error: "nationalId is required." }),
    mobile: z.string({ error: "mobile is required." }).min(1, { error: "mobile is required." }),
    password: z.string({ error: "password is required." }).min(1, { error: "password is required." }),
});

const getUserSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." }),
});

const updateUserSchema = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  nationalId: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
});

const deleteUserSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." }),
});

const getUserByEmailSchema = z.object({
    email: z.string({ error: "email is required." }).min(1, { error: "email is required." }),
});

const loginUserSchema = z.object({
  mobile: z.string({ error: "mobile is required." }).min(1, { error: "mobile is required." }),
  password: z.string({ error: "password is required." }).min(1, { error: "password is required." }),
});

const userDTOSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastName: z.string(),
  nationalId: z.string(),
  mobile: z.string(),
  status: userStatus,
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  bankAccounts: z.array(z.lazy((): z.ZodType => bankAccountDTOSchema))
    .nullable()
    .optional(),
  tickets: z.array(z.lazy((): z.ZodType => ticketDTOSchema))
    .nullable()
    .optional(),
  userInqueries: z.array(z.lazy((): z.ZodType => userInqueryDTOSchema))
    .nullable()
    .optional(),
}).openapi('userDTOSchema');

const simpleUserDTO = z.object({
  id: z.string(),
  name: z.string(),
  lastName: z.string(),
  nationalId: z.string(),
  mobile: z.string(),
  status: userStatus,
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const userLoginDTOSchema = z.object({
    user: z.object({
      id: z.string(),
      name: z.string(),
      lastName: z.string(),
      nationalId: z.string(),
      mobile: z.string(),
    })
});

export {
    createUserSchema,
    getUserSchema,
    updateUserSchema,
    deleteUserSchema,
    getUserByEmailSchema,
    userDTOSchema,
    simpleUserDTO,
    loginUserSchema,
    userLoginDTOSchema,
}
