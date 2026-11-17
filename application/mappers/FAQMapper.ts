import FAQ from '#models/FAQ.ts';
import { FAQDTO } from '#application/dto/FAQDTO.ts';


export class FAQMapper {
  /**
   * Maps a domain entity to a DTO
   */
  public static toDTO(entity: FAQ): FAQDTO {
    return {
      id: entity.id,
      question: entity.question,
      answer: entity.answer,
      order: entity.order,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  };

  public static toDTOList(entities: FAQ[]): FAQDTO[] {
    return entities.map(entity => this.toDTO(entity));
  };
}