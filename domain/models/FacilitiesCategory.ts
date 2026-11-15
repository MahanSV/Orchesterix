import BaseModel from "#models/base/baseModel.ts";
import FacilityTemplate, { FacilityTemplateSnapshotParams } from '#models/FacilityTemplate.ts';

export interface FacilitiesCategoryConstructorParams {
    id: string;
    name: string;
    key: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface FacilitiesCategorySnapshotParams {
    id: string;
    name: string;
    key: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    facilityTemplates?: FacilityTemplateSnapshotParams[];
}

class FacilitiesCategory extends BaseModel {
    private _name!: string;
    private _key!: string;
    private _order!: number;
    private _createdAt!: Date;
    private _updatedAt!: Date;
    private _facilityTemplates?: FacilityTemplate[];

    constructor() {
        super();
    };

    static create(params: FacilitiesCategoryConstructorParams): FacilitiesCategory {
        const facilityCategory = new FacilitiesCategory();

        if (params?.id) {
            facilityCategory.id = params?.id;
        }

        facilityCategory.name = params.name;
        facilityCategory.key = params.key;
        facilityCategory.order = params.order;
        facilityCategory.createdAt = params.createdAt;
        facilityCategory.updatedAt = params.updatedAt;

        return facilityCategory;
    };

    static createFromSnapshot(snapshot: FacilitiesCategorySnapshotParams): FacilitiesCategory {
        const facilityCategory = new FacilitiesCategory();

        facilityCategory.id = snapshot.id;
        facilityCategory.name = snapshot.name;
        facilityCategory.key = snapshot.key;
        facilityCategory.order = snapshot.order;
        facilityCategory.createdAt = snapshot.createdAt;
        facilityCategory.updatedAt = snapshot.updatedAt;
        facilityCategory.facilityTemplates = snapshot.facilityTemplates && snapshot.facilityTemplates.map(data => FacilityTemplate.createFromSnapshot(data));

        return facilityCategory;
    };

    public get name() {
        return this._name;
    };
    public set name(value) {
        this._name = value;
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

    public get facilityTemplates() {
        return this._facilityTemplates;
    };
    public set facilityTemplates(value) {
        this._facilityTemplates = value;
    };
}

export default FacilitiesCategory;