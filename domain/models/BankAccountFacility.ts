import BaseModel from '#models/base/baseModel.ts';
import BankAccount, {BankAccountSnapshotParams} from "#models/BankAccount.ts";
import FacilityField, { FacilityFieldSnapshotParams } from '#models/FacilityField.ts';

export interface BankAccountFacilityConstructorParams {
    id: string;
    value: string;
    createdAt: Date;
    updatedAt: Date;
    bankAccountId: string;
    facilityFieldId: string;
}

export interface BankAccountFacilitySnapshotParams {
    id: string;
    value: string;
    createdAt: Date;
    updatedAt: Date;
    bankAccountId: string;
    facilityFieldId: string;
    BankAccount?: BankAccountSnapshotParams;
    facilityField?: FacilityFieldSnapshotParams;
}

class BankAccountFacility extends BaseModel {
    private _value!: string;
    private _createdAt!: Date;
    private _updatedAt!: Date;
    private _bankAccountId!: string;
    private _facilityFieldId!: string;
    private _BankAccount?: BankAccount;
    private _facilityField?: FacilityField;

    static create(params: BankAccountFacilityConstructorParams): BankAccountFacility {
        const bankAccountFacility = new BankAccountFacility();

        if (params?.id) {
            bankAccountFacility.id = params?.id;
        }

        bankAccountFacility.value = params.value;
        bankAccountFacility.createdAt = params.createdAt;
        bankAccountFacility.updatedAt = params.updatedAt;
        bankAccountFacility.bankAccountId = params.bankAccountId;
        bankAccountFacility.facilityFieldId = params.facilityFieldId;

        return bankAccountFacility;
    };

    static createFromSnapshot(snapshot: BankAccountFacilitySnapshotParams): BankAccountFacility {
        const bankAccountFacility = new BankAccountFacility();

        bankAccountFacility.value = snapshot.value;
        bankAccountFacility.createdAt = snapshot.createdAt;
        bankAccountFacility.updatedAt = snapshot.updatedAt;
        bankAccountFacility.bankAccountId = snapshot.bankAccountId;
        bankAccountFacility.facilityFieldId = snapshot.facilityFieldId;
        bankAccountFacility.BankAccount = snapshot.BankAccount && BankAccount.createFromSnapshot(snapshot.BankAccount);
        bankAccountFacility.facilityField = snapshot.facilityField && FacilityField.createFromSnapshot(snapshot.facilityField);

        return bankAccountFacility;
    };

    public get value() {
        return this._value;
    };
    public set value(value) {
        this._value = value;
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

    public get bankAccountId() {
        return this._bankAccountId;
    };
    public set bankAccountId(value) {
        this._bankAccountId = value;
    };

    public get facilityFieldId() {
        return this._facilityFieldId;
    };
    public set facilityFieldId(value) {
        this._facilityFieldId = value;
    };

    public get BankAccount() {
        return this._BankAccount;
    };
    public set BankAccount(value) {
        this._BankAccount = value;
    };

    public get facilityField() {
        return this._facilityField;
    };
    public set facilityField(value) {
        this._facilityField = value;
    };
}

export default BankAccountFacility;