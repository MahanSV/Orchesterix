import Staff from '#models/Staff.ts';
import { StaffRole } from '#domain/enums/staff.ts';

export interface StaffRepositoryInterface {
  findById(id: string): Promise<Staff | null>;
  getStaffByNationalId(nationalId: string, role: StaffRole): Promise<Staff | null>;
  createStaff(entity: Staff): Promise<Staff>;
}