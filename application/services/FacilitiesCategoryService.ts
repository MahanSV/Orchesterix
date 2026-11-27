import { FacilitiesCategoryServiceInterface } from '#application/interfaces/FacilitiesCategoryServiceInterface.ts';
import { FacilitiesCategoryRepositoryInterface } from '#domain/interfaces/FacilitiesCategoryRepository.ts';
import { FacilitiesCategoryRepository } from '#repositories/FacilitiesCategoryRepository.ts';
import { FacilitiesCategoryDTO } from '#application/dto/FacilitiesCategoryDTO.ts';
import httpStatus from 'http-status';
import ApiError from '#webhost/errors/apiError.ts';
import { FacilitiesCategoryMapper } from '#application/mappers/FacilitiesCategoryMapper.ts';
import { createFacilityCategoryCommand } from '#application/types/facilitiesCategory/command.ts';
import { FacilityCategoryFactory } from '#domain/factories/FacilityCategoryFactory.ts';

export class FacilitiesCategoryService implements FacilitiesCategoryServiceInterface {
  private facilitiesCategoryRepository: FacilitiesCategoryRepositoryInterface;

  constructor(facilitiesCategoryRepository: FacilitiesCategoryRepositoryInterface = new FacilitiesCategoryRepository()) {
    this.facilitiesCategoryRepository = facilitiesCategoryRepository;
  };

  async findById(id: string): Promise<FacilitiesCategoryDTO> {
    const facilitiesCategory = await this.facilitiesCategoryRepository.findById(id);

    if (!facilitiesCategory)
      throw new ApiError(httpStatus.NOT_FOUND, 'دسته تسهیلات پیدا نشد.', 'Error');

    return FacilitiesCategoryMapper.toDTO(facilitiesCategory);
  };

  async createFacilityCategoryForSeed(command: createFacilityCategoryCommand): Promise<FacilitiesCategoryDTO> {
    const facilityCategoryEntity = FacilityCategoryFactory.create(command);

    const addFacilityCategory = await this.facilitiesCategoryRepository.create(facilityCategoryEntity);

    if (!addFacilityCategory)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا در هنگام ثبت دسته تسهیلات.', 'Error');

    return FacilitiesCategoryMapper.toDTO(addFacilityCategory);
  };

  async getAllFacilitiesCategory(): Promise<FacilitiesCategoryDTO[]> {
    const facilitiesCategories = await this.facilitiesCategoryRepository.getAllFacilitiesCategory();

    return facilitiesCategories.length > 0 ? FacilitiesCategoryMapper.toDTOList(facilitiesCategories) : [];
  };
}