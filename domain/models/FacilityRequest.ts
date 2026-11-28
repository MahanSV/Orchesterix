import BaseModel from '#models/base/baseModel.ts';
import User, { UserSnapshotParams } from '#models/User.ts';
import Staff, { StaffSnapshotParams } from '#models/Staff.ts';

export enum facilityRequestStatus {
  waitingForSupport = 'WAITING_FOR_SUPPORT',
  waitingForManager = 'WAITING_FOR_MANAGER',
  rejectedBySupport = 'REJECTED_BY_SUPPORT',
  rejectedByManager = 'REJECTED_BY_MANAGER',
  accepted = 'ACCEPTED'
}

export interface FacilityRequestConstructorParams {
  id: string;
  status: facilityRequestStatus;
  isActive: boolean;
  staffAnswer?: string
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  staffId?: string;
}

export interface FacilityRequestSnapshotParams {
  id: string;
  status: facilityRequestStatus;
  isActive: boolean;
  staffAnswer?: string
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  staffId?: string;
  user?: UserSnapshotParams;
  staff?: StaffSnapshotParams;
}

class FacilityRequest extends BaseModel {
  private _status!: facilityRequestStatus;
  private _isActive!: boolean;
  private _staffAnswer?: string
  private _createdAt!: Date;
  private _updatedAt!: Date;
  private _userId!: string;
  private _staffId?: string;
  private _user?: User;
  private _staff?: Staff;

  constructor() {
    super();
  };

  static create(params: FacilityRequestConstructorParams): FacilityRequest {
    const facilityRequest = new FacilityRequest();

    if (params?.id) {
      facilityRequest.id = params?.id;
    }

    facilityRequest.status = params.status;
    facilityRequest.isActive = params.isActive;
    facilityRequest.staffAnswer = params.staffAnswer;
    facilityRequest.createdAt = params.createdAt;
    facilityRequest.updatedAt = params.updatedAt;
    facilityRequest.userId = params.userId;
    facilityRequest.staffId = params.staffId;

    return facilityRequest;
  };

  static createFromSnapshot(snapshot: FacilityRequestSnapshotParams): FacilityRequest {
    const facilityRequest = new FacilityRequest();

    facilityRequest.id = snapshot.id;
    facilityRequest.status = snapshot.status;
    facilityRequest.isActive = snapshot.isActive;
    facilityRequest.staffAnswer = snapshot.staffAnswer;
    facilityRequest.createdAt = snapshot.createdAt;
    facilityRequest.updatedAt = snapshot.updatedAt;
    facilityRequest.userId = snapshot.userId;
    facilityRequest.staffId = snapshot.staffId;
    facilityRequest.user = snapshot.user && User.createFromSnapshot(snapshot.user);
    facilityRequest.staff = snapshot.staff && Staff.createFromSnapshot(snapshot.staff);

    return facilityRequest;
  };

  public get status() {
    return this._status;
  };
  public set status(value) {
    this._status = value;
  };

  public get isActive() {
    return this._isActive;
  };
  public set isActive(value) {
    this._isActive = value;
  };

  public get staffAnswer() {
    return this._staffAnswer;
  };
  public set staffAnswer(value) {
    this._staffAnswer = value;
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

  public get staffId() {
    return this._staffId;
  };
  public set staffId(value) {
    this._staffId = value;
  };

  public get user() {
    return this._user;
  };
  public set user(value) {
    this._user = value;
  };

  public get staff() {
    return this._staff;
  };
  public set staff(value) {
    this._staff = value;
  };
}

export default FacilityRequest;