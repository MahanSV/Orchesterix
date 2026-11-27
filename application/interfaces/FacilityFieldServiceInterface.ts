import { FacilityFieldDTO } from '#application/dto/FacilityFieldDTO.ts';
import { createFacilityFieldCommand } from '#application/types/facilityField/command.ts';


export interface FacilityFieldServiceInterface {
  findById(id: string): Promise<FacilityFieldDTO>;
  create(command: createFacilityFieldCommand): Promise<FacilityFieldDTO>;
}