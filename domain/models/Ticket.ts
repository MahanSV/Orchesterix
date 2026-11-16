import BaseModel from '#models/base/baseModel.ts';
import User, {UserSnapshotParams} from "#models/User.ts";
import Staff, {StaffSnapshotParams} from "#models/Staff.ts";
import { TicketStatus } from '#domain/enums/ticket.ts';

export interface TicketConstructorParams {
    id: string;
    description: string;
    attachment: string;
    status: TicketStatus;
    createdAt: Date;
    updatedAt: Date;
    closedAt?: Date;
    userId: string;
    staffId?: string;
}

export interface TicketSnapshotParams {
    id: string;
    description: string;
    attachment: string;
    status: TicketStatus;
    createdAt: Date;
    updatedAt: Date;
    closedAt?: Date;
    userId: string;
    staffId?: string;
    user: UserSnapshotParams;
    staff?: StaffSnapshotParams;
}

class Ticket extends BaseModel {
    private _description!: string;
    private _attachment!: string;
    private _status!: TicketStatus;
    private _createdAt!: Date;
    private _updatedAt!: Date;
    private _closedAt?: Date;
    private _userId!: string;
    private _staffId?: string;
    private _user!: User;
    private _staff?: Staff;

    constructor() {
        super();
    };

    static create(params: TicketConstructorParams): Ticket {
        const ticket = new Ticket();

        if (params?.id) {
            ticket.id = params?.id;
        }

        ticket.description = params.description;
        ticket.attachment = params.attachment;
        ticket.status = params.status;
        ticket.createdAt = params.createdAt;
        ticket.updatedAt = params.updatedAt;
        ticket.closedAt = params.closedAt;
        ticket.userId = params.userId;
        ticket.staffId = params.staffId;

        return ticket;
    };

    static createFromSnapshot(snapshot: TicketSnapshotParams): Ticket {
        const ticket = new Ticket();

        ticket.id = snapshot.id;
        ticket.description = snapshot.description;
        ticket.attachment = snapshot.attachment;
        ticket.status = snapshot.status;
        ticket.createdAt = snapshot.createdAt;
        ticket.updatedAt = snapshot.updatedAt;
        ticket.closedAt = snapshot.closedAt;
        ticket.userId = snapshot.userId;
        ticket.staffId = snapshot.staffId;
        ticket.user = snapshot.user && User.createFromSnapshot(snapshot.user);
        ticket.staff = snapshot.staff && Staff.createFromSnapshot(snapshot.staff);

        return ticket;
    };

    public get description() {
        return this._description;
    };
    public set description(value) {
        this._description = value;
    };

    public get attachment() {
        return this._attachment;
    };
    public set attachment(value) {
        this._attachment = value;
    };

    public get status() {
        return this._status;
    };
    public set status(value) {
        this._status = value;
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

    public get closedAt() {
        return this._closedAt;
    };
    public set closedAt(value) {
        this._closedAt = value;
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

export default Ticket;