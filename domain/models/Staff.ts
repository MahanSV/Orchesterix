import BaseModel from '#models/base/baseModel.ts';
import Ticket, {TicketSnapshotParams} from "#models/Ticket.ts";
import { StaffRole, StaffStatus } from '#domain/enums/staff.ts';

export interface StaffConstructorParams {
    id: string;
    name: string;
    lastName: string;
    nationalId: string;
    role: StaffRole;
    status: StaffStatus;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface StaffSnapshotParams {
    id: string;
    name: string;
    lastName: string;
    nationalId: string;
    role: StaffRole;
    status: StaffStatus;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    ticket?: TicketSnapshotParams;
}

class Staff extends BaseModel {
    private _name!: string;
    private _lastName!: string;
    private _nationalId!: string;
    private _role!: StaffRole;
    private _status!: StaffStatus;
    private _password!: string;
    private _createdAt!: Date;
    private _updatedAt!: Date;
    private _ticket?: Ticket;

    constructor() {
        super();
    };

    static create(params: StaffConstructorParams): Staff {
        const staff = new Staff();

        if (params?.id) {
            staff.id = params?.id;
        }

        staff.name = params.name;
        staff.lastName = params.lastName;
        staff.nationalId = params.nationalId;
        staff.role = params.role;
        staff.status = params.status;
        staff.password = params.password;
        staff.createdAt = params.createdAt;
        staff.updatedAt = params.updatedAt;

        return staff;
    };

    static createFromSnapshot(snapshot: StaffSnapshotParams): Staff {
        const staff = new Staff();

        staff.id = snapshot.id;
        staff.name = snapshot.name;
        staff.lastName = snapshot.lastName;
        staff.nationalId = snapshot.nationalId;
        staff.role = snapshot.role;
        staff.status = snapshot.status;
        staff.password = snapshot.password;
        staff.createdAt = snapshot.createdAt;
        staff.updatedAt = snapshot.updatedAt;
        staff.ticket = snapshot.ticket && Ticket.createFromSnapshot(snapshot.ticket);

        return staff;
    };

    public get name() {
        return this._name;
    };
    public set name(value) {
        this._name = value;
    };

    public get lastName() {
        return this._lastName;
    };
    public set lastName(value) {
        this._lastName = value;
    };

    public get nationalId() {
        return this._nationalId;
    };
    public set nationalId(value) {
        this._nationalId = value;
    };

    public get role() {
        return this._role;
    };
    public set role(value) {
        this._role = value;
    };

    public get status() {
        return this._status;
    };
    public set status(value) {
        this._status = value;
    };

    public get password() {
        return this._password;
    };
    public set password(value) {
        this._password = value;
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

    public get ticket() {
        return this._ticket;
    };
    public set ticket(value) {
        this._ticket = value;
    };
}

export default Staff;