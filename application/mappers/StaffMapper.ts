import { StaffDTO, StaffLoginDTO } from '#application/dto/StaffDTO.ts';
import Staff from '#domain/models/Staff.ts';
import { TicketMapper } from '#application/mappers/TicketMapper.ts';

export class StaffMapper {
  /**
   * Maps a domain entity to a DTO
   */
  public static toDTO(entity: Staff): StaffDTO {
    return {
      id: entity.id,
      name: entity.name,
      lastName: entity.lastName,
      nationalId: entity.nationalId,
      role: entity.role,
      status: entity.status,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      ticket: entity.ticket ? TicketMapper.toDTO(entity.ticket) : undefined,
    };
  };
  /**
   * Maps a list of domain entities to DTOs
   */
  public static toDTOList(entities: Staff[]): StaffDTO[] {
    return entities.map(entity => this.toDTO(entity));
  };

  /**
   * for only login
   */
  public static toStaffLoginDTO(entity: Staff, userToken: string): StaffLoginDTO {
    return {
      token: userToken,
      userInfo: {
        id: entity.id,
        name: entity.name,
        lastName: entity.lastName,
        nationalId: entity.nationalId,
        role: entity.role,
      }
    };
  }
}