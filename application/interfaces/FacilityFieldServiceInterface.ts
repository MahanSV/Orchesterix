import { FacilityFieldDTO } from '#application/dto/FacilityFieldDTO.ts';


export interface FacilityFieldServiceInterface {
  findById(id: string): Promise<FacilityFieldDTO>;
}