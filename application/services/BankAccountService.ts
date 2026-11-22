import { BankAccountServiceInterface } from '#application/interfaces/BankAccountServiceInterface.ts';
import { BankAccountRepositoryInterface } from '#domain/interfaces/BankAccountRepository.ts';
import BankAccountRepository from '#repositories/BankAccountRepository.ts';
import { BankAccountDTO } from '#application/dto/BankAccountDTO.ts';
import httpStatus from 'http-status';
import ApiError from '#webhost/errors/apiError.ts';
import { BankAccountMapper } from '#application/mappers/BankAccountMapper.ts';


export class BankAccountService implements BankAccountServiceInterface {
  private bankAccountRepository: BankAccountRepositoryInterface;

  constructor(bankAccountRepository: BankAccountRepositoryInterface = new BankAccountRepository()) {
    this.bankAccountRepository = bankAccountRepository;
  };

  async findById(id: string): Promise<BankAccountDTO> {
    const bankAccount = await this.bankAccountRepository.findById(id);

    if (!bankAccount)
      throw new ApiError(httpStatus.NOT_FOUND, 'حساب بانکی کاربر پیدا نشد.', 'Error');

    return BankAccountMapper.toDTO(bankAccount);
  };
}