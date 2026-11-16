import { StaffRole, StaffStatus } from '#domain/enums/staff.ts';

export type createStaffCommand = {
  name: string;
  lastName: string;
  nationalId: string;
  role: StaffRole;
  status: StaffStatus;
  password: string;
};