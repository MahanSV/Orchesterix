import FAQ from '#models/FAQ.ts';
import { updateFAQCommand } from '#application/types/FAQ/command.ts';


export interface FAQRepositoryInterface {
  findById(id: string): Promise<FAQ | null>;
  getAll(): Promise<FAQ[]>;
  findLastFAQ(): Promise<FAQ | null>;
  addFAQ(entity: FAQ): Promise<FAQ>;
  updateFAQ(command: updateFAQCommand): Promise<FAQ>;
  updateFAQOrders(id: string, order: number): Promise<FAQ>;
  deleteFAQ(id: string): Promise<FAQ | null>;
}