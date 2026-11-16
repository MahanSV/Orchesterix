import BaseModel from '#models/base/baseModel.ts';
import User, {UserSnapshotParams} from "#models/User.ts";
import BankAccountFacility, {BankAccountFacilitySnapshotParams} from "#models/BankAccountFacility.ts";
import { BankAccountStatus, bankAccountType } from '#domain/enums/bankAccount.ts';

export interface BankAccountConstructorParams {
    id: string;
    accountHolderName: string;
    shebaId: string;
    cardNumber: string;
    branchCode: string;
    branchName: string;
    turnover: string;
    type: bankAccountType;
    status: BankAccountStatus;
    score: string;
    userId: string;
}

export interface BankAccountSnapshotParams {
    id: string;
    accountHolderName: string;
    shebaId: string;
    cardNumber: string;
    branchCode: string;
    branchName: string;
    turnover: string;
    type: bankAccountType;
    status: BankAccountStatus;
    score: string;
    userId: string;
    user?: UserSnapshotParams;
    bankAccountFacilities?: BankAccountFacilitySnapshotParams[];
}

class BankAccount extends BaseModel {
    private _accountHolderName!: string;
    private _shebaId!: string;
    private _cardNumber!: string;
    private _branchCode!: string;
    private _branchName!: string;
    private _turnover!: string;
    private _type!: bankAccountType;
    private _status!: BankAccountStatus;
    private _score!: string;
    private _userId!: string;
    private _user?: User;
    private _bankAccountFacilities?: BankAccountFacility[];

    constructor() {
        super();
    };

    static create(params: BankAccountConstructorParams): BankAccount {
        const bankAccount = new BankAccount();

        if (params?.id) {
            bankAccount.id = params?.id;
        }

        bankAccount.accountHolderName = params.accountHolderName;
        bankAccount.shebaId = params.shebaId;
        bankAccount.cardNumber = params.cardNumber;
        bankAccount.branchCode = params.branchCode;
        bankAccount.branchName = params.branchName;
        bankAccount.turnover = params.turnover;
        bankAccount.type = params.type;
        bankAccount.status = params.status;
        bankAccount.score = params.score;
        bankAccount.userId = params.userId;

        return bankAccount;
    };

    static createFromSnapshot(snapshot: BankAccountSnapshotParams): BankAccount {
        const bankAccount = new BankAccount();

        bankAccount.accountHolderName = snapshot.accountHolderName;
        bankAccount.shebaId = snapshot.shebaId;
        bankAccount.cardNumber = snapshot.cardNumber;
        bankAccount.branchCode = snapshot.branchCode;
        bankAccount.branchName = snapshot.branchName;
        bankAccount.turnover = snapshot.turnover;
        bankAccount.type = snapshot.type;
        bankAccount.status = snapshot.status;
        bankAccount.score = snapshot.score;
        bankAccount.userId = snapshot.userId;
        bankAccount.user = snapshot.user && User.createFromSnapshot(snapshot.user);
        bankAccount.bankAccountFacilities = snapshot.bankAccountFacilities && snapshot.bankAccountFacilities.map(data => BankAccountFacility.createFromSnapshot(data));

        return bankAccount;
    };

    private get accountHolderName() {
        return this._accountHolderName;
    };
    private set accountHolderName(value) {
        this._accountHolderName = value;
    };

    private get shebaId() {
        return this._shebaId;
    };
    private set shebaId(value) {
        this._shebaId = value;
    };

    private get cardNumber() {
        return this._cardNumber;
    };
    private set cardNumber(value) {
        this._cardNumber = value;
    };

    private get branchCode() {
        return this._branchCode;
    };
    private set branchCode(value) {
        this._branchCode = value;
    };

    private get branchName() {
        return this._branchName;
    };
    private set branchName(value) {
        this._branchName = value;
    };

    private get turnover() {
        return this._turnover;
    };
    private set turnover(value) {
        this._turnover = value;
    };

    private get type() {
        return this._type;
    };
    private set type(value) {
        this._type = value;
    };

    private get status() {
        return this._status;
    };
    private set status(value) {
        this._status = value;
    };

    private get score() {
        return this._score;
    };
    private set score(value) {
        this._score = value;
    };

    private get userId() {
        return this._userId;
    };
    private set userId(value) {
        this._userId = value;
    };

    private get user() {
        return this._user;
    };
    private set user(value) {
        this._user = value;
    };

    private get bankAccountFacilities() {
        return this._bankAccountFacilities;
    };
    private set bankAccountFacilities(value) {
        this._bankAccountFacilities = value;
    };
}

export default BankAccount;