import Ticket from '#models/Ticket.ts';
import { TicketDTO } from '#application/dto/TicketDTO.ts';
import { UserMapper } from '#application/mappers/UserMapper.ts';
import { StaffMapper } from '#application/mappers/StaffMapper.ts';


export class TicketMapper {
  /**
   * Maps a domain entity to a DTO
   */
  public static toDTO(entity: Ticket): TicketDTO {
    return {
      id: entity.id,
      description: entity.description,
      attachment: entity.attachment,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      closedAt: entity.closedAt ? entity.closedAt : undefined,
      userId: entity.userId,
      staffId: entity.staffId ? entity.staffId : undefined,
      user: entity.user ? UserMapper.toDTO(entity.user) : undefined,
      staff: entity.staff ? StaffMapper.toDTO(entity.staff): undefined,
    };
  };

  public static toDTOList(entities: Ticket[]): TicketDTO[] {
    return entities.map(entity => this.toDTO(entity));
  };
}