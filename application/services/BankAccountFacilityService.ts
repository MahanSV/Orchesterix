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
import CalculateUserCredit, { CalculateUserCreditResult } from '#substructure/utils/calculateUserCredit.ts';
import { BankAccountFacilityFactory } from '#domain/factories/BankAccountFacilityFactory.ts';
import FacilityField from '#models/FacilityField.ts';
import { detectStringType } from '#substructure/utils/detectStringType.ts';
import { FacilityType } from '../../seeds/facilitiesSeed.ts';


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

    const facilityFields = facilityTemplate.facilityFields;

    if (!facilityFields)
      throw new ApiError(httpStatus.FAILED_DEPENDENCY,'فیلد های قالب تسهیلات رفاهی مورد نظر یافت نشد. ', 'Error');

    const facilityCategory = facilityTemplate.facilitiesCategory;

    if (!facilityCategory)
      throw new ApiError(httpStatus.FAILED_DEPENDENCY,'دسته قالب تسهیلات رفاهی مورد نظر یافت نشد. ', 'Error')

    const validateBankAccountFacility = await this.validateBankAccountAndFacilityFieldIds(command.data, facilityFields);

    if (!validateBankAccountFacility)
      throw new ApiError(httpStatus.BAD_REQUEST, 'فیلد رفاهی یا حساب بانکی نامعتبر است.', 'Error');

    const calculateUserCreditForRequest = new CalculateUserCredit(inQuery);
    const userCredit = calculateUserCreditForRequest.calculateUserCredit();

    const amountFacilityFieldKeyWord = 'مبلغ درخواستی از بانک';

    const facilityFieldAmountRecord = facilityFields.find(facilityField => facilityField.value === amountFacilityFieldKeyWord);

    if (!facilityFieldAmountRecord)
      throw new ApiError(httpStatus.FAILED_DEPENDENCY, 'فیلد مبلغی پیدا نشد.', 'Error');

    const facilityFieldAmountRecordId = facilityFieldAmountRecord.id;

    const facilityCategoryKey = this.validateFacilityType(facilityCategory.key)

    const userFacilityCategoryLimit = this.getFacilityMaxAllowed(userCredit, facilityCategoryKey);

    return await Promise.all(
      command.data.map(async (bankAccountFacility) => {
        if (bankAccountFacility.facilityFieldId === facilityFieldAmountRecordId) {
          const userAmountRequest = detectStringType(bankAccountFacility.value) === 'integer' ? Number(bankAccountFacility.value) : undefined;

          if (!userAmountRequest)
            throw new ApiError(httpStatus.CONFLICT, 'مبلغ ورودی نامعتبر میباشد.', 'Error');

          if (userAmountRequest > userFacilityCategoryLimit)
            throw new ApiError(httpStatus.BAD_REQUEST, 'مبلغ درخواستی از بانک بیش از اعتبار کاربر می باشد.', 'Error');

        }

        const bankAccountFacilityEntity = BankAccountFacilityFactory.create(bankAccountFacility);

        const addBankAccountFacility =
          await this.bankAccountFacilityRepository.create(bankAccountFacilityEntity);

        if (!addBankAccountFacility)
          throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا درهنگام ایجاد تسهیلات حساب بانکی کاربر.', 'Error');

        return BankAccountFacilityMapper.toDTO(bankAccountFacilityEntity);
      })
    );
  };

  private async validateBankAccountAndFacilityFieldIds(command: createBankAccountFacilityCommand[], facilityFields: FacilityField[]): Promise<boolean> {
    const bankAccountFacilityValidateResult = await Promise.all(
      command.map(
        async (bankAccountFacility): Promise<boolean> => {
          // میشه آیدی کاربر رو گرفت و با یکبار کوئری وجود حساب بانکی رو بررسی کرد.
          const bankAccount = await this.bankAccountRepository.findById(bankAccountFacility.bankAccountId);
          if (!bankAccount) return false;

         return facilityFields.some(facilityField => facilityField.id === bankAccountFacility.facilityFieldId);
        }
      )
    );

    // Even one item doesn't exist it will return false
    return bankAccountFacilityValidateResult.every(Boolean);
  };

  private getFacilityMaxAllowed(
    creditResult: CalculateUserCreditResult,
    facilityType: FacilityType,
  ): number {
    const facilityMap: Record<FacilityType, number> = {
      Loan: creditResult.facilities.loan.maxAllowed,
      Guarantee: creditResult.facilities.guarantee.maxAllowed,
      'Electronic Promissory Note': creditResult.facilities.promissoryNote.maxAllowed,
      Participation: creditResult.facilities.partnership.maxAllowed,
    };

    return facilityMap[facilityType];
  };

  private validateFacilityType(value: string): FacilityType {
    const validValues = Object.values(FacilityType);

    if (!validValues.includes(value as FacilityType)) {
      throw new Error(`Invalid facility type: ${value}`);
    }

    return value as FacilityType;
  };
}