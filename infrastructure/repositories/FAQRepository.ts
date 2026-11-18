import { BaseRepository } from '#repositories/BaseRepository.ts';
import FAQ from '#models/FAQ.ts';
import { updateFAQCommand } from '#application/types/FAQ/command.ts';
import { FAQRepositoryInterface } from '#domain/interfaces/FAQRepository.ts';
import prisma from '#context/dbContext/prisma/client.ts';


export default class FAQRepository extends BaseRepository<FAQ> implements FAQRepositoryInterface {
  constructor() {
    super(FAQ.createFromSnapshot);
  };

  async findById(id: string): Promise<FAQ | null> {
    const dataModel = await prisma.fAQ.findUnique({
      where: { id }
    });

    return dataModel && FAQ.createFromSnapshot(dataModel);
  };

  async getAll(): Promise<FAQ[]> {
    const dataModels = await prisma.fAQ.findMany();

    return dataModels.map(data => FAQ.createFromSnapshot(data));
  };

  async findLastFAQ(): Promise<FAQ | null> {
    const latestFAQ = await prisma.fAQ.findFirst({
      orderBy: {
        order: 'desc',
      }
    });

    return latestFAQ&&FAQ.createFromSnapshot(latestFAQ);
  };

  async addFAQ(entity: FAQ): Promise<FAQ> {
    const dataModel = await prisma.fAQ.create({
      data: this.createSchemaFromFAQModel(entity),
    });

    return dataModel && FAQ.createFromSnapshot(dataModel);
  };

  async updateFAQ(command: updateFAQCommand): Promise<FAQ> {
    const dataModel = await prisma.fAQ.update({
      where: { id: command.id },
      data: {
        question: command.question,
        answer: command.answer,
      }
    });

    return dataModel && FAQ.createFromSnapshot(dataModel);
  };

  async updateFAQOrders(id: string, order: number): Promise<FAQ> {
    const dataModel = await prisma.fAQ.update({
      where: { id },
      data: {
        order: order,
      }
    });

    return dataModel && FAQ.createFromSnapshot(dataModel);
  };

  async deleteFAQ(id: string): Promise<FAQ | null> {
    const deletedFAQ = await prisma.fAQ.findUnique({
      where: { id },
    });

    if (!deletedFAQ) return null;

    const dataModel = await prisma.fAQ.delete({
      where: { id }
    });

    await prisma.fAQ.updateMany({
      where: {
        order: {
          gt: deletedFAQ.order,
        },
      },
      data: {
        order: {
          decrement: 1,
        },
      }
    });

    return dataModel && FAQ.createFromSnapshot(dataModel);
  };

  createSchemaFromFAQModel(entity: FAQ) {
    return {
      id: entity.id,
      question: entity.question,
      answer: entity.answer,
      order: entity.order,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    };
  };
}