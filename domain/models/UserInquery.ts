import BaseModel from '#models/base/baseModel.ts';
import User, {UserSnapshotParams} from "#models/User.ts";

export type Guarantee = {
  id: string;
  guaranteeNumber: string;
  type: string;
  bankName: string;
  beneficiary: string;
  applicant: string;
  amount: number,
  currency: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  description: string;
}

export type Loan = {
  id: string;
  loanNumber: string;
  borrower: string;
  bankName: string;
  loanType: 'PERSONAL' | 'HOME' | 'BUSINESS' | 'AUTO';
  principal: number;
  interestRate: number;
  termMonths: number;
  monthlyInstallment: number;
  paidInstallments: number;
  remainingBalance: number;
  issueDate: Date;
  maturityDate: Date;
  status: 'ACTIVE' | 'PAID' | 'OVERDUE' | 'DEFAULTED' | 'PENDING';
};

export interface UserInqueryConstructorParams {
    id: string;
    point?: string;
    guarantees?: Guarantee[];
    loans?: Loan[];
    totalTurnover: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export interface UserInquerySnapshotParams {
    id: string;
    point?: string;
    guarantees?: Guarantee[];
    loans?: Loan[];
    totalTurnover: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user?: UserSnapshotParams;
}

class UserInquery extends BaseModel {
    private _point?: string;
    private _guarantees?: Guarantee[];
    private _loans?: Loan[];
    private _totalTurnover!: number;
    private _createdAt!: Date;
    private _updatedAt!: Date;
    private _userId!: string;
    private _user?: User;

    constructor() {
        super();
    };

    static create(params: UserInqueryConstructorParams): UserInquery {
        const userInquery = new UserInquery();

        if (params?.id) {
            userInquery.id = params?.id;
        }

        userInquery.point = params.point;
        userInquery.guarantees = params.guarantees;
        userInquery.loans = params.loans;
        userInquery.totalTurnover = params.totalTurnover;
        userInquery.createdAt = params.createdAt;
        userInquery.updatedAt = params.updatedAt;
        userInquery.userId = params.userId;

        return userInquery;
    };

    static createFromSnapshot(snapshot: UserInquerySnapshotParams): UserInquery {
        const userInquery = new UserInquery();

        userInquery.id = snapshot.id;
        userInquery.point = snapshot.point;
        userInquery.guarantees = snapshot.guarantees;
        userInquery.loans = snapshot.loans;
        userInquery.totalTurnover = snapshot.totalTurnover;
        userInquery.createdAt = snapshot.createdAt;
        userInquery.updatedAt = snapshot.updatedAt;
        userInquery.userId = snapshot.userId;
        userInquery.user = snapshot.user ? User.createFromSnapshot(snapshot.user) : undefined;

        return userInquery;
    };

    public get point() {
        return this._point;
    };
    public set point(value) {
        this._point = value;
    };

    public get guarantees() {
        return this._guarantees;
    };
    public set guarantees(value) {
        this._guarantees = value;
    };

    public get loans() {
      return this._loans;
    };
    public set loans(value) {
      this._loans = value;
    };

    public get totalTurnover() {
        return this._totalTurnover;
    };
    public set totalTurnover(value) {
        this._totalTurnover = value;
    };

    public get createdAt() {
        return this._createdAt;
    };
    public set createdAt(value) {
        this._createdAt = value;
    };

    public get updatedAt() {
        return this._updatedAt;
    };
    public set updatedAt(value) {
        this._updatedAt = value;
    };

    public get userId() {
        return this._userId;
    };
    public set userId(value) {
        this._userId = value;
    };

    public get user() {
        return this._user;
    };
    public set user(value) {
        this._user = value;
    };
}

export default UserInquery;