import FacilityTemplate from '#models/FacilityTemplate.ts';
import { FacilityTemplateDTO } from '#application/dto/FacilityTemplateDTO.ts';
import { FacilitiesCategoryMapper } from '#application/mappers/FacilitiesCategoryMapper.ts';
import { FacilityFieldMapper } from '#application/mappers/FacilityFieldMapper.ts';


export class FacilityTemplateMapper {
  /**
   * Maps a domain entity to a DTO
   */
  public static toDTO(entity: FacilityTemplate): FacilityTemplateDTO {
    return {
      id: entity.id,
      value: entity.value,
      key: entity.key,
      order: entity.order,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      facilitiesCategoryId: entity.facilitiesCategoryId,
      facilitiesCategory: entity.facilitiesCategory ? FacilitiesCategoryMapper.toDTO(entity.facilitiesCategory) : undefined,
      facilityFields: entity.facilityFields ? FacilityFieldMapper.toDTOList(entity.facilityFields) : undefined,
    };
  };

  public static toDTOList(entities: FacilityTemplate[]): FacilityTemplateDTO[] {
    return entities.map(entity => this.toDTO(entity));
  };
}