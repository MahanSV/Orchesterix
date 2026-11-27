import { FacilityTemplateServiceInterface } from '#application/interfaces/FacilityTemplateServiceInterface.ts';
import { FacilityTemplateRepositoryInterface } from '#domain/interfaces/FacilityTemplateRepository.ts';
import { FacilityTemplateRepository } from '#repositories/FacilityTemplateRepository.ts';
import { FacilityTemplateDTO } from '#application/dto/FacilityTemplateDTO.ts';
import httpStatus from 'http-status';
import ApiError from '#webhost/errors/apiError.ts';
import { FacilityTemplateMapper } from '#application/mappers/FacilityTemplateMapper.ts';
import { createFacilityTemplateCommand } from '#application/types/facilityTemplate/command.ts';
import { FacilityTemplateFactory } from '#domain/factories/FacilityTemplateFactory.ts';

export class FacilityTemplateService implements FacilityTemplateServiceInterface {
  private facilityTemplateRepository: FacilityTemplateRepositoryInterface;

  constructor(facilityTemplateRepository: FacilityTemplateRepositoryInterface = new FacilityTemplateRepository()) {
    this.facilityTemplateRepository = facilityTemplateRepository;
  };

  async findById(id: string): Promise<FacilityTemplateDTO> {
    const facilityTemplate = await this.facilityTemplateRepository.findById(id);

    if (!facilityTemplate)
      throw new ApiError(httpStatus.NOT_FOUND, 'قالب رفاهی مورد نظر پیدا نشد.', 'Error');

    return FacilityTemplateMapper.toDTO(facilityTemplate);
  };

  async create(command: createFacilityTemplateCommand): Promise<FacilityTemplateDTO> {
    const entity = FacilityTemplateFactory.create(command);

    const addFacilityTemplate = await this.facilityTemplateRepository.create(entity);

    if (!addFacilityTemplate)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا در هنگام ایجاد قالب تسهیلات.', 'Error');

    return FacilityTemplateMapper.toDTO(addFacilityTemplate);
  };
}