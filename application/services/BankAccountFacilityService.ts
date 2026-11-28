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
    const inQuery = await this.getUserInQuery(command.userId);

    const { facilityFields, facilitiesCategory } = await this.getValidatedFacilityTemplate(command.facilityTemplateId);

    const isBankAccountFacilityValid = await this.validateBankAccountAndFacilityFieldIds(command.data, facilityFields);

    if (!isBankAccountFacilityValid)
      throw new ApiError(httpStatus.BAD_REQUEST, 'فیلد رفاهی یا حساب بانکی نامعتبر است.', 'Error');

    const userCredit = this.calculateUserCredit(inQuery);
    const facilityFieldAmountRecordId = this.getFacilityAmountFieldId(facilityFields);
    const facilityCategoryKey = this.validateFacilityType(facilitiesCategory.key);
    const userFacilityCategoryLimit = this.getFacilityMaxAllowed(userCredit, facilityCategoryKey);

    return await Promise.all(
      command.data.map(async (bankAccountFacility) => {
        this.validateUserAmountRequest(
          bankAccountFacility,
          facilityFieldAmountRecordId,
          userFacilityCategoryLimit,
        );
        return this.createSingleBankAccountFacility(bankAccountFacility);
      })
    );
  };

  // ── مسئولیت: اعتبارسنجی کاربر و دریافت استعلامات بانکی ──
  private async getUserInQuery(userId: string) {
    const user = await this.userRepository.getUserWithUserInQuery(userId);
    if (!user)
      throw new ApiError(httpStatus.NOT_FOUND, 'کاربر یافت نشد.', 'Error');

    const inQuery = user.userInqueries;
    if (!inQuery)
      throw new ApiError(httpStatus.BAD_REQUEST, 'کاربر دارای استعلامات بانکی نیست.', 'Error');

    return inQuery;
  };

  // ── مسئولیت: اعتبارسنجی قالب تسهیلات و استخراج فیلدها و دسته آن ──
  private async getValidatedFacilityTemplate(facilityTemplateId: string) {
    const facilityTemplate = await this.facilityTemplateRepository.findById(facilityTemplateId);

    if (!facilityTemplate)
      throw new ApiError(httpStatus.NOT_FOUND, 'قالب تسهیلات رفاهی مورد نظر یافت نشد.', 'Error');

    const { facilityFields, facilitiesCategory } = facilityTemplate;

    if (!facilityFields)
      throw new ApiError(httpStatus.FAILED_DEPENDENCY, 'فیلد های قالب تسهیلات رفاهی مورد نظر یافت نشد. ', 'Error');

    if (!facilitiesCategory)
      throw new ApiError(httpStatus.FAILED_DEPENDENCY, 'دسته قالب تسهیلات رفاهی مورد نظر یافت نشد. ', 'Error');

    return { facilityFields, facilitiesCategory };
  };

  // ── مسئولیت: محاسبه اعتبار کاربر ──
  private calculateUserCredit(inQuery: ConstructorParameters<typeof CalculateUserCredit>[0]): CalculateUserCreditResult {
    const calculateUserCreditForRequest = new CalculateUserCredit(inQuery);

    return calculateUserCreditForRequest.calculateUserCredit();
  };

  // ── مسئولیت: یافتن آیدی فیلد «مبلغ درخواستی از بانک» ──
  private getFacilityAmountFieldId(facilityFields: FacilityField[]): FacilityField['id'] {
    const amountFacilityFieldKeyWord = 'مبلغ درخواستی از بانک';

    const facilityFieldAmountRecord = facilityFields.find(
      facilityField => facilityField.value === amountFacilityFieldKeyWord,
    );

    if (!facilityFieldAmountRecord)
      throw new ApiError(httpStatus.FAILED_DEPENDENCY, 'فیلد مبلغی پیدا نشد.', 'Error');

    return facilityFieldAmountRecord.id;
  };

  // ── مسئولیت: اعتبارسنجی مبلغ درخواستی کاربر در برابر سقف مجاز ──
  private validateUserAmountRequest(
    bankAccountFacility: createBankAccountFacilityCommand,
    facilityFieldAmountRecordId: FacilityField['id'],
    userFacilityCategoryLimit: number,
  ): void {
    if (bankAccountFacility.facilityFieldId !== facilityFieldAmountRecordId) return;

    const userAmountRequest = detectStringType(bankAccountFacility.value) === 'integer'
      ? Number(bankAccountFacility.value)
      : undefined;

    if (!userAmountRequest)
      throw new ApiError(httpStatus.CONFLICT, 'مبلغ ورودی نامعتبر میباشد.', 'Error');

    if (userAmountRequest > userFacilityCategoryLimit)
      throw new ApiError(httpStatus.BAD_REQUEST, 'مبلغ درخواستی از بانک بیش از اعتبار کاربر می باشد.', 'Error');
  };

  // ── مسئولیت: ساخت و ذخیره یک نهاد تسهیلات حساب بانکی ──
  private async createSingleBankAccountFacility(bankAccountFacility: createBankAccountFacilityCommand): Promise<BankAccountFacilityDTO> {
    const bankAccountFacilityEntity = BankAccountFacilityFactory.create(bankAccountFacility);

    const addBankAccountFacility = await this.bankAccountFacilityRepository.create(bankAccountFacilityEntity);

    if (!addBankAccountFacility)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا درهنگام ایجاد تسهیلات حساب بانکی کاربر.', 'Error');

    return BankAccountFacilityMapper.toDTO(bankAccountFacilityEntity);
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

  private getFacilityMaxAllowed(creditResult: CalculateUserCreditResult, facilityType: FacilityType): number {
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

    if (!validValues.includes(value as FacilityType))
      throw new Error(`Invalid facility type: ${value}`);

    return value as FacilityType;
  };
}