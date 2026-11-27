import FacilityField from '#models/FacilityField.ts';


export interface FacilityFieldRepositoryInterface {
  findById(id: string): Promise<FacilityField | null>;
  create(entity: FacilityField): Promise<FacilityField>;
}