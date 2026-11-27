import { FacilityFieldServiceInterface } from '#application/interfaces/FacilityFieldServiceInterface.ts';
import { FacilityFieldDTO } from '#application/dto/FacilityFieldDTO.ts';
import { FacilityFieldRepositoryInterface } from '#domain/interfaces/FacilityFieldRepository.ts';
import { FacilityFieldRepository } from '#repositories/FacilityFieldRepository.ts';
import httpStatus from 'http-status';
import ApiError from '#webhost/errors/apiError.ts';
import { FacilityFieldMapper } from '#application/mappers/FacilityFieldMapper.ts';
import { createFacilityFieldCommand } from '#application/types/facilityField/command.ts';
import { FacilityFieldFactory } from '#domain/factories/FacilityFieldFactory.ts';

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

  async create(command: createFacilityFieldCommand): Promise<FacilityFieldDTO> {
    const facilityFieldEntity = FacilityFieldFactory.create(command);

    const addFacilityField = await this.facilityFieldRepository.create(facilityFieldEntity);

    if (!addFacilityField)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا در هنگام ایجاد فیلد رفاهی.', 'Error');

    return FacilityFieldMapper.toDTO(facilityFieldEntity);
  }
}