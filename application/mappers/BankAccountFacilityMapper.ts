import BankAccountFacility from '#models/BankAccountFacility.ts';
import { BankAccountFacilityDTO } from '#application/dto/BankAccountFacilityDTO.ts';
import { BankAccountMapper } from '#application/mappers/BankAccountMapper.ts';
import { FacilityFieldMapper } from '#application/mappers/FacilityFieldMapper.ts';

export class BankAccountFacilityMapper {
  /**
   * Maps a domain entity to a DTO
   */
  public static toDTO(entity: BankAccountFacility): BankAccountFacilityDTO {
    return {
      id: entity.id,
      value: entity.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      bankAccountId: entity.bankAccountId,
      facilityFieldId: entity.facilityFieldId,
      bankAccount: entity.bankAccount ? BankAccountMapper.toDTO(entity.bankAccount) : undefined,
      facilityField: entity.facilityField ? FacilityFieldMapper.toDTO(entity.facilityField) : undefined,
    };
  };

  public static toDTOList(entities: BankAccountFacility[]): BankAccountFacilityDTO[] {
    return entities.map(entity => this.toDTO(entity));
  };
}