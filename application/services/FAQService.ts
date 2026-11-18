import { FAQServiceInterface } from '#application/interfaces/FAQServiceInterface.ts';
import { FAQRepositoryInterface } from '#domain/interfaces/FAQRepository.ts';
import FAQRepository from '#repositories/FAQRepository.ts';
import { FAQDTO } from '#application/dto/FAQDTO.ts';
import { createFAQCommand, updateFAQCommand, updateFAQOrderCommand } from '#application/types/FAQ/command.ts';
import { FAQMapper } from '#application/mappers/FAQMapper.ts';
import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';
import { FAQFactory } from '#domain/factories/FAQFactory.ts';


export class FAQService implements FAQServiceInterface {
  private faqRepository: FAQRepositoryInterface;

  constructor(faqRepository: FAQRepositoryInterface = new FAQRepository()) {
    this.faqRepository = faqRepository;
  };

  async getAllFAQs(): Promise<FAQDTO[]> {
    const faqList = await this.faqRepository.getAll();

    return FAQMapper.toDTOList(faqList);
  };

  async getFAQById(id: string): Promise<FAQDTO> {
    const faq = await this.faqRepository.findById(id);

    if (!faq)
      throw new ApiError(httpStatus.NOT_FOUND, 'سوال پیدا نشد.', 'Error');

    return FAQMapper.toDTO(faq);
  };

  async createFAQ(command: createFAQCommand): Promise<FAQDTO> {
    const lastFAQ = await this.faqRepository.findLastFAQ();

    const lastOrderNumber = lastFAQ ? lastFAQ.order : 0;

    command.order = String(lastOrderNumber + 1);

    const faqEntity = FAQFactory.create(command);

    const addFAQ = await this.faqRepository.addFAQ(faqEntity);

    if (!addFAQ)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا در هنگام ثبت سوال.', 'Error');

    return FAQMapper.toDTO(addFAQ);
  };

  async updateFAQ(command: updateFAQCommand): Promise<FAQDTO> {
    const faq = await this.faqRepository.findById(command.id);

    if (!faq)
      throw new ApiError(httpStatus.NOT_FOUND, 'سوال یافت نشد.', 'Error');

    const updatedFaQ = await this.faqRepository.updateFAQ(command);

    if (!updatedFaQ)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا در هنگام به روز رسانی سوال.', 'Error');

    return FAQMapper.toDTO(updatedFaQ);
  };

  async updateFAQOrders(command: updateFAQOrderCommand): Promise<FAQDTO[]> {
    return Promise.all(
      command.orders.map((item) =>
        this.faqRepository.updateFAQOrders(item.id, item.order)
      )
    );
  }

  async deleteFAQ(id: string): Promise<FAQDTO> {
    const deletedFAQ = await this.faqRepository.deleteFAQ(id);

    if (!deletedFAQ)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا در هنگام حذف سوال.', 'Error');

    return FAQMapper.toDTO(deletedFAQ);
  };
}