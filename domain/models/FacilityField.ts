import BaseModel from '#models/base/baseModel.ts';
import FacilityTemplate, { FacilityTemplateSnapshotParams } from '#models/FacilityTemplate.ts';
import BankAccountFacility, { BankAccountFacilitySnapshotParams } from '#models/BankAccountFacility.ts';

export interface FacilityFieldConstructorParams {
  id: string;
  value: string;
  facilityTemplateId: string;
}

export interface FacilityFieldSnapshotParams {
  id: string;
  value: string;
  facilityTemplateId: string;
  facilityTemplate?: FacilityTemplateSnapshotParams;
  bankAccountFacilities?: BankAccountFacilitySnapshotParams[];
}

class FacilityField extends BaseModel {
  private _value!: string;
  private _facilityTemplateId!: string;
  private _facilityTemplate?: FacilityTemplate;
  private _bankAccountFacilities?: BankAccountFacility[];

  constructor() {
    super();
  };

  static create(params: FacilityFieldConstructorParams): FacilityField {
    const facilityField = new FacilityField();

    if (params?.id) {
      facilityField.id = params?.id;
    }

    facilityField.value = params.value;
    facilityField.facilityTemplateId = params.facilityTemplateId;

    return facilityField;
  };

  static createFromSnapshot(snapshot: FacilityFieldSnapshotParams): FacilityField {
    const facilityField = new FacilityField();

    facilityField.id = snapshot.id;
    facilityField.value = snapshot.value;
    facilityField.facilityTemplateId = snapshot.facilityTemplateId;
    facilityField.facilityTemplate = snapshot.facilityTemplate && FacilityTemplate.createFromSnapshot(snapshot.facilityTemplate);
    facilityField.bankAccountFacilities = snapshot.bankAccountFacilities && snapshot.bankAccountFacilities.map(data => BankAccountFacility.createFromSnapshot(data));

    return facilityField;
  };

  public get value() {
    return this._value;
  };
  public set value(value) {
    this._value = value;
  };

  public get facilityTemplateId() {
    return this._facilityTemplateId;
  };
  public set facilityTemplateId(value) {
    this._facilityTemplateId = value;
  };

  public get facilityTemplate() {
    return this._facilityTemplate;
  };
  public set facilityTemplate(value) {
    this._facilityTemplate = value;
  };

  public get bankAccountFacilities() {
    return this._bankAccountFacilities;
  };
  public set bankAccountFacilities(value) {
    this._bankAccountFacilities = value;
  };
}

export default FacilityField;