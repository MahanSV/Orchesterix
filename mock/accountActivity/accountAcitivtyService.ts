
export class AccountAcitivtyService {
  public static generateRandomNumber(): number {
    const length = Math.floor(Math.random() * 7) + 6;

    const min = 10 ** (length - 1);
    const max = 10 ** length - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}