import UserInquery from '#models/UserInquery.ts';
import { UserInqueryDTO } from '#application/dto/UserInqueryDTO.ts';
import { UserMapper } from '#application/mappers/UserMapper.ts';


export class UserInqueryMapper {
  /**
   * Maps a domain entity to a DTO
   */
  public static toDTO(entity: UserInquery): UserInqueryDTO {
    return {
      id: entity.id,
      point: entity.point,
      guarantees: entity.guarantees,
      totalTurnover: entity.totalTurnover,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      userId: entity.userId,
      user: entity.user ? UserMapper.toDTO(entity.user) : undefined,
    };
  };

  public static toDTOList(entities: UserInquery[]): UserInqueryDTO[] {
    return entities.map(entity => this.toDTO(entity));
  };
}