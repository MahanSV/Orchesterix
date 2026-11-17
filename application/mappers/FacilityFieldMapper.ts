import FacilityField from '#models/FacilityField.ts';
import { FacilityFieldDTO } from '#application/dto/FacilityFieldDTO.ts';
import { BankAccountFacilityMapper } from '#application/mappers/BankAccountFacilityMapper.ts';
import { FacilityTemplateMapper } from '#application/mappers/FacilityTemplateMapper.ts';


export class FacilityFieldMapper {
  /**
   * Maps a domain entity to a DTO
   */
  public static toDTO(entity: FacilityField): FacilityFieldDTO {
    return {
      id: entity.id,
      value: entity.value,
      facilityTemplateId: entity.facilityTemplateId,
      facilityTemplate: entity.facilityTemplate ? FacilityTemplateMapper.toDTO(entity.facilityTemplate) : undefined,
      bankAccountFacilities: entity.bankAccountFacilities ? BankAccountFacilityMapper.toDTOList(entity.bankAccountFacilities) : undefined,
    };
  };

  public static toDTOList(entities: FacilityField[]): FacilityFieldDTO[] {
    return entities.map(entity => this.toDTO(entity));
  };
}