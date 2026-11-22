import { FacilitiesCategoryServiceInterface } from '#application/interfaces/FacilitiesCategoryServiceInterface.ts';
import { FacilitiesCategoryRepositoryInterface } from '#domain/interfaces/FacilitiesCategoryRepository.ts';
import { FacilitiesCategoryRepository } from '#repositories/FacilitiesCategoryRepository.ts';
import { BankAccountDTO } from '#application/dto/BankAccountDTO.ts';
import httpStatus from 'http-status';
import ApiError from '#webhost/errors/apiError.ts';
import { FacilitiesCategoryMapper } from '#application/mappers/FacilitiesCategoryMapper.ts';

export class FacilitiesCategoryService implements FacilitiesCategoryServiceInterface {
  private facilitiesCategoryRepository: FacilitiesCategoryRepositoryInterface;
  constructor(facilitiesCategoryRepository: FacilitiesCategoryRepositoryInterface = new FacilitiesCategoryRepository()) {
    this.facilitiesCategoryRepository = facilitiesCategoryRepository;
  }

  async findById(id: string): Promise<BankAccountDTO> {
    const facilitiesCategory = await this.facilitiesCategoryRepository.findById(id);

    if (!facilitiesCategory)
      throw new ApiError(httpStatus.NOT_FOUND, 'دسته تسهیلات پیدا نشد.', 'Error');

    return FacilitiesCategoryMapper.toDTO(facilitiesCategory);
  };
}