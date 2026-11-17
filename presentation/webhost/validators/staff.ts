import { z } from 'zod';

const staffRole = z.enum(['Admin', 'Support', 'Manager']);
const staffStatus = z.enum(['Active','Inactive']);

const loginStaffSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastName: z.string(),
  nationalId: z.string(),
  role: staffRole,
  status: staffStatus,
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  // ticket // TODO: Compelete.
});

const createStaff = z.object({
  name: z.string({ error: "name is required." }).min(1, { error: "name is required." }),
  lastName: z.string({ error: "lastName is required." }).min(1, { error: "lastName is required." }),
  nationalId: z.string({ error: "nationalId is required." }).min(1, { error: "nationalId is required." }),
  role: staffRole,
  status: staffStatus,
  password: z.string({ error: "password is required." }).min(1, { error: "password is required." }),
});

const staffDTOSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastName: z.string(),
  nationalId: z.string(),
  role: staffRole,
});

export { loginStaffSchema, staffDTOSchema, createStaff };