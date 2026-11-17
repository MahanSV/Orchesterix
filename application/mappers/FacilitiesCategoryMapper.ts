import FacilitiesCategory from '#models/FacilitiesCategory.ts';
import { FacilitiesCategoryDTO } from '#application/dto/FacilitiesCategoryDTO.ts';
import { FacilityTemplateMapper } from '#application/mappers/FacilityTemplateMapper.ts';


export class FacilitiesCategoryMapper {
  /**
   * Maps a domain entity to a DTO
   */
  public static toDTO(entity: FacilitiesCategory): FacilitiesCategoryDTO {
    return {
      id: entity.id,
      name: entity.name,
      key: entity.key,
      order: entity.order,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      facilityTemplates: entity.facilityTemplates ? FacilityTemplateMapper.toDTOList(entity.facilityTemplates) : [],
    };
  };

  public static toDTOList(entities: FacilitiesCategory[]): FacilitiesCategoryDTO[] {
    return entities.map(entity => this.toDTO(entity));
  };
}