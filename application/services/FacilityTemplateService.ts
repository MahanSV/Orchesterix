import { FacilityTemplateServiceInterface } from '#application/interfaces/FacilityTemplateServiceInterface.ts';
import { FacilityTemplateRepositoryInterface } from '#domain/interfaces/FacilityTemplateRepository.ts';
import { FacilityTemplateRepository } from '#repositories/FacilityTemplateRepository.ts';
import { FacilityTemplateDTO } from '#application/dto/FacilityTemplateDTO.ts';
import httpStatus from 'http-status';
import ApiError from '#webhost/errors/apiError.ts';
import { FacilityTemplateMapper } from '#application/mappers/FacilityTemplateMapper.ts';

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
}