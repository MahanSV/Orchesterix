import BaseModel from '#models/base/baseModel.ts';
import facilitiesCategory, { FacilitiesCategorySnapshotParams } from '#models/FacilitiesCategory.ts';
import FacilityField, { FacilityFieldSnapshotParams } from '#models/FacilityField.ts';
import FacilitiesCategory from '#models/FacilitiesCategory.ts';

export interface FacilityFieldConstructorParams {
  id: string;
  value: string;
  key: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  facilitiesCategoryId: string;
}

export interface FacilityTemplateSnapshotParams {
  id: string;
  value: string;
  key: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  facilitiesCategoryId: string;
  facilitiesCategory?: FacilitiesCategorySnapshotParams;
  facilityFields: FacilityFieldSnapshotParams[];
}


class FacilityTemplate extends BaseModel {
  private _value!: string;
  private _key!: string;
  private _order!: number;
  private _createdAt!: Date;
  private _updatedAt!: Date;
  private _facilitiesCategoryId!: string;
  private _facilitiesCategory?: FacilitiesCategory;
  private _facilityFields?: FacilityField[];

  constructor() {
    super();
  };


  static create(params: FacilityFieldConstructorParams): FacilityTemplate {
    const facilityTemplate = new FacilityTemplate();

    if (params?.id) {
      facilityTemplate.id = params?.id;
    }

    facilityTemplate.value = params.value;
    facilityTemplate.key = params.key;
    facilityTemplate.order = params.order;
    facilityTemplate.createdAt = params.createdAt;
    facilityTemplate.updatedAt = params.updatedAt;
    facilityTemplate.facilitiesCategoryId = params.facilitiesCategoryId;

    return facilityTemplate;
  };

  static createFromSnapshot(snapshot: FacilityTemplateSnapshotParams): FacilityTemplate {
    const facilityTemplate = new FacilityTemplate();

    facilityTemplate.id = snapshot.id;
    facilityTemplate.value = snapshot.value;
    facilityTemplate.key = snapshot.key;
    facilityTemplate.order = snapshot.order;
    facilityTemplate.createdAt = snapshot.createdAt;
    facilityTemplate.updatedAt = snapshot.updatedAt;
    facilityTemplate.facilitiesCategoryId = snapshot.facilitiesCategoryId;
    facilityTemplate.facilitiesCategory = snapshot.facilitiesCategory && facilitiesCategory.createFromSnapshot(snapshot.facilitiesCategory);
    facilityTemplate.facilityFields = snapshot.facilityFields && snapshot.facilityFields.map(data => FacilityField.createFromSnapshot(data));

    return facilityTemplate;
  };

  public get value() {
    return this._value;
  };
  public set value(value) {
    this._value = value;
  };

  public get key() {
    return this._key;
  };
  public set key(value) {
    this._key = value;
  };

  public get order() {
    return this._order;
  };
  public set order(value) {
    this._order = value;
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

  public get facilitiesCategoryId() {
    return this._facilitiesCategoryId;
  };
  public set facilitiesCategoryId(value) {
    this._facilitiesCategoryId = value;
  };

  public get facilitiesCategory() {
    return this._facilitiesCategory;
  };
  public set facilitiesCategory(value) {
    this._facilitiesCategory = value;
  };

  public get facilityFields() {
    return this._facilityFields;
  };
  public set facilityFields(value) {
    this._facilityFields = value;
  };
}

export default FacilityTemplate;