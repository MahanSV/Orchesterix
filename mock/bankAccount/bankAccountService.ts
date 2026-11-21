import {
  BANK_CODES,
  BANK_CARD_PREFIXES,
  BANK_ACCOUNTS_STATUS,
  BANK_ACCOUNTS_TYPES,
  BRANCH_NAMES,
  FIRST_NAMES,
  LAST_NAMES,
  TURNOVER_LENGTH_RANGES,
} from './constants.ts';

export interface GenerateBankAccount {
  fullName: string;
  sheba: string;
  cardNumber: string;
  branchCode: string;
  branchName: string;
  turnover: string;
  score: number;
  type: string;
  status: string;
}

export interface BankAccountMockServiceInterface {
  randomNameGenerator(): string,
  randomShebaGenerator(): string,
  randomCardNumberGenerator(sheba: string): string,
  randomBranchCodeGenerator(): string,
  randomBranchNameGenerator(): string,
  randomTurnoverGenerator(): string,
  randomScoreGenerator(): number,
  randomTypeGenerator(): string,
  randomStatusGenerator(): string,
  generateBankAccount(): GenerateBankAccount
  generateListOfBankAccounts(): GenerateBankAccount[];
}

export class BankAccountMockService implements BankAccountMockServiceInterface {
  randomNameGenerator(): string {
    const firstName =
      FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];

    const lastName =
      LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];

    return `${firstName} ${lastName}`;
  }

  randomShebaGenerator(): string {
    const bankCode =
      BANK_CODES[Math.floor(Math.random() * BANK_CODES.length)];

    const accountNumber = Array.from({ length: 19 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');

    const bban = `${bankCode}${accountNumber}`;

    // Calculate checksum
    const rearranged = `${bban}182700`;
    const remainder = BigInt(rearranged) % 97n;
    const checkDigits = (98n - remainder).toString().padStart(2, '0');

    return `IR${checkDigits}${bban}`;
  }

  randomCardNumberGenerator(sheba: string): string {
    const bankCode = sheba.substring(4, 7);

    const prefixes = BANK_CARD_PREFIXES[bankCode];

    if (!prefixes) {
      throw new Error('Unsupported bank code');
    }

    const cardPrefix =
      prefixes[Math.floor(Math.random() * prefixes.length)];

    const randomDigits = Array.from({ length: 9 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');

    const cardWithoutChecksum = `${cardPrefix}${randomDigits}`;

    // Luhn algorithm
    let sum = 0;

    for (let i = 0; i < cardWithoutChecksum.length; i++) {
      let digit = Number(cardWithoutChecksum[i]);

      if (i % 2 === 0) {
        digit *= 2;

        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
    }

    const checksum = (10 - (sum % 10)) % 10;

    return `${cardWithoutChecksum}${checksum}`;
  }

  randomBranchCodeGenerator(): string {
    return Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, '0');
  };

  randomBranchNameGenerator(): string {
    return BRANCH_NAMES[Math.floor(Math.random() * BRANCH_NAMES.length)];

  };

  randomTurnoverGenerator(): string {
    const selectedRange =
      TURNOVER_LENGTH_RANGES[
        Math.floor(Math.random() * TURNOVER_LENGTH_RANGES.length)
        ];

    const length =
      Math.floor(
        Math.random() *
        (selectedRange.max - selectedRange.min + 1),
      ) + selectedRange.min;

    return Array.from({ length }, () =>
      Math.floor(Math.random() * 10),
    ).join('');
  }

  randomScoreGenerator(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  randomTypeGenerator(): string {
    return BANK_ACCOUNTS_TYPES[
      Math.floor(Math.random() * BANK_ACCOUNTS_TYPES.length)
      ];
  }

  randomStatusGenerator(): string {
    return BANK_ACCOUNTS_STATUS[
      Math.floor(Math.random() * BANK_ACCOUNTS_STATUS.length)
      ];
  }

  generateBankAccount(): GenerateBankAccount {
    const sheba = this.randomShebaGenerator();

    return {
      fullName: this.randomNameGenerator(),
      sheba,
      cardNumber: this.randomCardNumberGenerator(sheba),
      branchCode: this.randomBranchCodeGenerator(),
      branchName: this.randomBranchNameGenerator(),
      turnover: this.randomTurnoverGenerator(),
      score: this.randomScoreGenerator(),
      type: this.randomTypeGenerator(),
      status: this.randomStatusGenerator(),
    };
  };

  generateListOfBankAccounts(): GenerateBankAccount[] {
    const result = [];

    const randomNumber = Math.floor(Math.random() *15) +1;

    for (let i = 1; i <= randomNumber; i++) {
      result.push(this.generateBankAccount());
    }

    return result;
  };
}
