import UserInquery from '#models/UserInquery.ts';
import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';

export interface CalculateUserCreditResult {
  totalCreditCapacity: number;
  availableCreditCapacity: number;
  usedCreditCapacity: number;
  facilities: {
    guarantee: {
      maxAllowed: number;
    };
    loan: {
      maxAllowed: number;
    };
    promissoryNote: {
      maxAllowed: number;
    };
    partnership: {
      maxAllowed: number;
    };
  };
}

interface CalculateFacilityLimits {
  guarantee: {
    maxAllowed: number;
  };
  loan: {
    maxAllowed: number;
  };
  promissoryNote: {
    maxAllowed: number;
  };
  partnership: {
    maxAllowed: number;
  };
}

class CalculateUserCredit {
  private readonly userInQuery: UserInquery;

  private readonly minimumPoint: number;
  private readonly minimumTotalTurnover: number;
  private readonly maximumGuaranteeAmount: number;

  constructor(userInQuery: UserInquery) {
    this.userInQuery = userInQuery;
    this.minimumPoint = 20;
    this.minimumTotalTurnover = 10 ** 9;  // 1,000,000,000
    this.maximumGuaranteeAmount = 10 ** 10; // 10,000,000,000
  };

  private checkUserHaveMoreThanLimitedPoint(): boolean {
    const userPoint = this.userInQuery.point ? Number(this.userInQuery.point) : undefined;

    if (!userPoint) return false;

    if (userPoint< this.minimumPoint)
      throw new ApiError(httpStatus.BAD_REQUEST, `کاربر کمتر از ${this.minimumPoint} امتیاز دارد.`, 'Error');

    return true;
  };

  private checkUserHaveMoreThanLimitedTurnover(): boolean {
    const userTurnover = this.userInQuery.totalTurnover ? Number(this.userInQuery.totalTurnover) : undefined;

    if (!userTurnover) return false;

    if (userTurnover < this.minimumTotalTurnover)
      throw new ApiError(httpStatus.BAD_REQUEST, `کاربر کمتر از ${this.minimumTotalTurnover} گردش مالی دارد.`, 'Error');

    return true;
  };

  private checkUserHaveMoreThanLimitedGuarantees(): boolean {
    const userGuarantees = this.userInQuery.guarantees;

    if (!userGuarantees) return true;

    let totalUserGuaranteeAmount: number = 0;

    for(const guarantee of userGuarantees) {
      totalUserGuaranteeAmount+=guarantee.amount;
    }

    if (totalUserGuaranteeAmount > this.maximumGuaranteeAmount) {
      throw new ApiError(httpStatus.BAD_REQUEST, `کاربر نمیتواند با ضمانتنامه یا ضمانتنامه های بالای ${this.maximumGuaranteeAmount} تومان درخواست بدهد.`, 'Error');
    }
    else {
      return true;
    }
  };

  private userInitialValidationForRequest(): void {
    const inQueryData = this.userInQuery;

    if (!inQueryData)
      throw new ApiError(httpStatus.BAD_REQUEST, 'اطلاعات استعلامات کاربر ناموجود می باشد.', 'Error');

    const isUserAbleToHaveRequestByPoint = this.checkUserHaveMoreThanLimitedPoint();

    const isUserAbleToHaveRequestByTotalTurnover = this.checkUserHaveMoreThanLimitedTurnover();

    const isUserAbleToHaveRequestByGuarantees = this.checkUserHaveMoreThanLimitedGuarantees();

    if (
      !isUserAbleToHaveRequestByPoint ||
      !isUserAbleToHaveRequestByTotalTurnover ||
      !isUserAbleToHaveRequestByGuarantees
    ) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'اطلاعات استعلامات کاربر ناقص می باشد.', 'Error');
    }
  };

  // Calculate user's credit score multiplier
  private calculatePointMultiplier(): number {
    const point = Number(this.userInQuery.point);

    if (point >= 90) return 1;
    if (point >= 70) return 0.8;
    if (point >= 50) return 0.6;
    if (point >= 35) return 0.4;
    return 0.2;
  };

  // Calculate user's turnover multiplier
  private calculateTurnoverMultiplier(): number {
    const turnover = Number(this.userInQuery.totalTurnover);

    if (turnover >= 10 ** 11) return 1;
    if (turnover >= 5 * 10 ** 10) return 0.8;
    if (turnover >= 10 ** 10) return 0.6;
    if (turnover >= 5 * 10 ** 9) return 0.4;

    return 0.2;
  };

  // Calculate user's initial credit capacity
  private calculateInitialCreditCapacity(): number {
    const pointMultiplier = this.calculatePointMultiplier();
    const turnoverMultiplier = this.calculateTurnoverMultiplier();

    const baseCreditCapacity =
      Number(this.userInQuery.totalTurnover) * 0.5;

    return Math.floor(
      baseCreditCapacity *
      pointMultiplier *
      turnoverMultiplier
    );
  };

  // Calculate user's current guarantee obligations
  private calculateCurrentGuaranteeObligations(): number {
    return (this.userInQuery.guarantees ?? []).reduce(
      (total, guarantee) => total + Number(guarantee.amount),
      0
    );
  };

  // Calculate user's available credit capacity
  private calculateAvailableCreditCapacity(): number {
    const initialCapacity = this.calculateInitialCreditCapacity();
    const currentGuarantees = this.calculateCurrentGuaranteeObligations();

    return Math.max(0, initialCapacity - currentGuarantees);
  };

  // Allocate credit capacity to each financial facility
  private calculateFacilityLimits(): CalculateFacilityLimits {
    const availableCredit = this.calculateAvailableCreditCapacity();

    return {
      guarantee: {
        maxAllowed: availableCredit * 0.3,
      },
      loan: {
        maxAllowed: availableCredit * 0.4,
      },
      promissoryNote: {
        maxAllowed: availableCredit * 0.1,
      },
      partnership: {
        maxAllowed: availableCredit * 0.2,
      },
    };
  };

  public calculateUserCredit(): CalculateUserCreditResult {
    this.userInitialValidationForRequest();

    const totalCreditCapacity = this.calculateInitialCreditCapacity();

    const availableCreditCapacity = this.calculateAvailableCreditCapacity();

    const facilities = this.calculateFacilityLimits();

    return {
      totalCreditCapacity,
      availableCreditCapacity,
      usedCreditCapacity: totalCreditCapacity - availableCreditCapacity,
      facilities,
    };
  };
}

export default CalculateUserCredit;