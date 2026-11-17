import { loginStaffCommand } from '#application/types/staff/command.ts';
import { StaffDTO, StaffLoginDTO } from '#application/dto/StaffDTO.ts';


export interface StaffServiceInterface {
  login(command: loginStaffCommand): Promise<StaffLoginDTO>
}