import { BankAccountFacilityServiceInterface } from '#application/interfaces/BankAccountFacilityServiceInterface.ts';
import { BankAccountFacilityRepositoryInterface } from '#domain/interfaces/BankAccountFacilityRepository.ts';
import BankAccountFacilityRepository from '#repositories/BankAccountFacilityRepository.ts';
import { BankAccountFacilityDTO, BankAccountFacilityFilterDTO } from '#application/dto/BankAccountFacilityDTO.ts';
import httpStatus from 'http-status';
import ApiError from '#webhost/errors/apiError.ts';
import { BankAccountFacilityMapper } from '#application/mappers/BankAccountFacilityMapper.ts';
import {
  adminFilterQueryCommand, createBankAccountFacilityCommand,
  createBankAccountFacilityListCommand,
} from '#application/types/bankAccountFacility/command.ts';
import { BankAccountRepositoryInterface } from '#domain/interfaces/BankAccountRepository.ts';
import BankAccountRepository from '#repositories/BankAccountRepository.ts';
import { FacilityTemplateRepositoryInterface } from '#domain/interfaces/FacilityTemplateRepository.ts';
import { FacilityTemplateRepository } from '#repositories/FacilityTemplateRepository.ts';
import type { UserRepositoryInterface } from '#domain/interfaces/UserRepository.ts';
import UserRepository from '#repositories/UserRepository.ts';
import CalculateUserCredit from '#substructure/utils/calculateUserCredit.ts';


export class BankAccountFacilityService implements BankAccountFacilityServiceInterface {
  private bankAccountFacilityRepository: BankAccountFacilityRepositoryInterface;
  private bankAccountRepository: BankAccountRepositoryInterface;
  private facilityTemplateRepository: FacilityTemplateRepositoryInterface;
  private userRepository: UserRepositoryInterface;

  constructor(
    bankAccountFacilityRepository: BankAccountFacilityRepositoryInterface = new BankAccountFacilityRepository(),
    bankAccountRepository: BankAccountRepositoryInterface = new BankAccountRepository(),
    facilityTemplateRepository: FacilityTemplateRepositoryInterface = new FacilityTemplateRepository(),
    userRepository: UserRepositoryInterface = new UserRepository(),
  ) {
    this.bankAccountFacilityRepository = bankAccountFacilityRepository;
    this.bankAccountRepository = bankAccountRepository;
    this.facilityTemplateRepository = facilityTemplateRepository;
    this.userRepository = userRepository;
  };

  async findById(id: string): Promise<BankAccountFacilityDTO> {
    const bankAccountFacility = await this.bankAccountFacilityRepository.findById(id);

    if (!bankAccountFacility)
      throw new ApiError(httpStatus.NOT_FOUND, 'تسهیلات حساب بانکی کاربر یافت نشد.', 'Error');

    return BankAccountFacilityMapper.toDTO(bankAccountFacility);
  };

  async getAllFilteredBankAccountFacilitiesForAdmin(query: adminFilterQueryCommand): Promise<BankAccountFacilityFilterDTO> {
    const result = await this.bankAccountFacilityRepository.getAllFilteredBankAccountFacilitiesForAdmin(query);

    const bankAccountFacilitiesDTO =
      result?.bankAccountFacilities?.length > 0
        ? BankAccountFacilityMapper.toDTOList(result.bankAccountFacilities)
        : [];

    return {
      bankAccountFacilities: bankAccountFacilitiesDTO,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    };
  };

  async createBankAccountFacility(command: createBankAccountFacilityListCommand): Promise<BankAccountFacilityDTO[]> {
    const user = await this.userRepository.getUserWithUserInQuery(command.userId);

    if (!user)
      throw new ApiError(httpStatus.NOT_FOUND, 'کاربر یافت نشد.', 'Error');

    const inQuery = user?.userInqueries;

    if (!inQuery)
      throw new ApiError(httpStatus.BAD_REQUEST, 'کاربر دارای استعلامات بانکی نیست.', 'Error');

    const facilityTemplate = await this.facilityTemplateRepository.findById(command.facilityTemplateId);

    if (!facilityTemplate)
      throw new ApiError(httpStatus.NOT_FOUND, 'قالب تسهیلات رفاهی مورد نظر یافت نشد.', 'Error');

    const validateBankAccountFacility = await this.validateBankAccountAndFacilityFieldIds(command.data);

    if (!validateBankAccountFacility)
      throw new ApiError(httpStatus.BAD_REQUEST, 'فیلد رفاهی یا حساب بانکی نامعتبر است.', 'Error');

    const calculateUserCreditForRequest = new CalculateUserCredit(inQuery);
    const userCredit = calculateUserCreditForRequest.calculateUserCredit();

    const amountFacilityFieldKeyWord = 'مبلغ درخواستی از بانک';

    // TODO: Need's to complete.
    /*return await Promise.all(
      command.data.map(async (bankAccountFacility) => {
      })
    );*/
  };

  private async validateBankAccountAndFacilityFieldIds(command: createBankAccountFacilityCommand[]): Promise<boolean> {
    const bankAccountFacilityValidateResult = await Promise.all(
      command.map(
        async (bankAccountFacility): Promise<boolean> => {

          const bankAccount = await this.bankAccountRepository.findById(bankAccountFacility.bankAccountId);
          if (!bankAccount) return false;

         const facilityField = await this.bankAccountFacilityRepository.findById(bankAccountFacility.facilityFieldId);
         if (!facilityField) return false;

         return true;
        }
      )
    );

    // Even one item doesn't exist it will return false
    return bankAccountFacilityValidateResult.every(Boolean);
  };
}