import BankAccount from '#models/BankAccount.ts';
import { BankAccountDTO } from '#application/dto/BankAccountDTO.ts';
import { UserMapper } from '#application/mappers/UserMapper.ts';
import { BankAccountFacilityMapper } from '#application/mappers/BankAccountFacilityMapper.ts';

export class BankAccountMapper {
  /**
   * Maps a domain entity to a DTO
   */
  public static toDTO(entity: BankAccount): BankAccountDTO {
    return {
      id: entity.id,
      accountHolderName: entity.accountHolderName,
      shebaId: entity.shebaId,
      cardNumber: entity.cardNumber,
      branchCode: entity.branchCode,
      branchName: entity.branchName,
      turnover: entity.turnover,
      type: entity.type,
      status: entity.status,
      score: entity.score,
      userId: entity.userId,
      user: entity.user ? UserMapper.toDTO(entity.user) : undefined,
      bankAccountFacilities: entity.bankAccountFacilities ? BankAccountFacilityMapper.toDTOList(entity.bankAccountFacilities) : undefined,
    };
  };

  public static toDTOList(entities: BankAccount[]): BankAccountDTO[] {
    return entities.map(entity => this.toDTO(entity));
  };
}