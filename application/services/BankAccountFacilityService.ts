import { BankAccountFacilityServiceInterface } from '#application/interfaces/BankAccountFacilityServiceInterface.ts';
import { BankAccountFacilityRepositoryInterface } from '#domain/interfaces/BankAccountFacilityRepository.ts';
import BankAccountFacilityRepository from '#repositories/BankAccountFacilityRepository.ts';
import { BankAccountFacilityDTO } from '#application/dto/BankAccountFacilityDTO.ts';
import httpStatus from 'http-status';
import ApiError from '#webhost/errors/apiError.ts';
import { BankAccountFacilityMapper } from '#application/mappers/BankAccountFacilityMapper.ts';

export class BankAccountFacilityService implements BankAccountFacilityServiceInterface {
  private bankAccountFacilityRepository: BankAccountFacilityRepositoryInterface;

  constructor(bankAccountFacilityRepository: BankAccountFacilityServiceInterface = new BankAccountFacilityRepository()) {
    this.bankAccountFacilityRepository = bankAccountFacilityRepository;
  };

  async findById(id: string): Promise<BankAccountFacilityDTO> {
    const bankAccountFacility = await this.bankAccountFacilityRepository.findById(id);

    if (!bankAccountFacility)
      throw new ApiError(httpStatus.NOT_FOUND, 'تسهیلات حساب بانکی کاربر یافت نشد.', 'Error');

    return BankAccountFacilityMapper.toDTO(bankAccountFacility);
  };
}