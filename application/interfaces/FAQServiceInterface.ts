import { FAQDTO } from '#application/dto/FAQDTO.ts';
import { createFAQCommand, updateFAQCommand, updateFAQOrderCommand } from '#application/types/FAQ/command.ts';


export interface FAQServiceInterface {
  getAllFAQs(): Promise<FAQDTO[]>;
  getFAQById(id: string): Promise<FAQDTO>;
  createFAQ(command: createFAQCommand): Promise<FAQDTO>;
  updateFAQ(command: updateFAQCommand): Promise<FAQDTO>;
  updateFAQOrders(command: updateFAQOrderCommand): Promise<FAQDTO[]>;
  deleteFAQ(id: string): Promise<FAQDTO>;
}