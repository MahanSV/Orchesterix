import { FacilityFieldServiceInterface } from '#application/interfaces/FacilityFieldServiceInterface.ts';
import { FacilityFieldDTO } from '#application/dto/FacilityFieldDTO.ts';
import { FacilityFieldRepositoryInterface } from '#domain/interfaces/FacilityFieldRepository.ts';
import { FacilityFieldRepository } from '#repositories/FacilityFieldRepository.ts';
import httpStatus from 'http-status';
import ApiError from '#webhost/errors/apiError.ts';
import { FacilityFieldMapper } from '#application/mappers/FacilityFieldMapper.ts';

export class FacilityFieldService implements FacilityFieldServiceInterface {
  private facilityFieldRepository: FacilityFieldRepositoryInterface;

  constructor(facilityFieldRepository: FacilityFieldRepositoryInterface = new FacilityFieldRepository()) {
    this.facilityFieldRepository = facilityFieldRepository;
  };

  async findById(id: string): Promise<FacilityFieldDTO> {
    const facilityField = await this.facilityFieldRepository.findById(id);

    if (!facilityField)
      throw new ApiError(httpStatus.NOT_FOUND, 'فیلد رفاهی مورد نظر یافت نشد.', 'Error');

    return FacilityFieldMapper.toDTO(facilityField);
  };
}