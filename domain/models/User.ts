import BaseModel from '#models/base/baseModel.ts';
import UserInquery, {UserInquerySnapshotParams} from "#models/UserInquery.ts";
import Ticket, {TicketSnapshotParams} from "#models/Ticket.ts";
import BankAccount, {BankAccountSnapshotParams} from "#models/BankAccount.ts";


export interface UserConstructorParams {
    id: string;
    name: string;
    lastName: string;
    nationalId: string;
    mobile: string;
    status: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserSnapshotParams {
    id: string;
    name: string;
    lastName: string;
    nationalId: string;
    mobile: string;
    status: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    bankAccounts?: BankAccountSnapshotParams[];
    tickets?: TicketSnapshotParams[];
    userInqueries?: UserInquerySnapshotParams;
}

class User extends BaseModel {
    private _name!: string;
    private _lastName!: string;
    private _nationalId!: string;
    private _mobile!: string;
    private _status!: string;
    private _password!: string;
    private _createdAt!: Date;
    private _updatedAt!: Date;
    private _bankAccounts?: BankAccount[];
    private _tickets?: Ticket[];
    private _userInqueries?: UserInquery;


    constructor() {
        super();
    };

    static create(params: UserConstructorParams): User {
        const user = new User();

        if (params?.id) {
            user.id = params?.id;
        }

        user.name = params.name;
        user.lastName = params.lastName;
        user.nationalId = params.nationalId;
        user.mobile = params.mobile;
        user.status = params.status;
        user.password = params.password;
        user.createdAt = params.createdAt;
        user.updatedAt = params.updatedAt;

        return user;
    };

    static createFromSnapshot(snapshot: UserSnapshotParams): User {
        const user = new User();

        user.id = snapshot.id;
        user.name = snapshot.name;
        user.lastName = snapshot.lastName;
        user.nationalId = snapshot.nationalId;
        user.mobile = snapshot.mobile;
        user.status = snapshot.status;
        user.password = snapshot.password;
        user.createdAt = snapshot.createdAt;
        user.updatedAt = snapshot.updatedAt;
        user.bankAccounts = snapshot.bankAccounts && snapshot.bankAccounts?.map(data => BankAccount.createFromSnapshot(data));
        user.tickets = snapshot.tickets && snapshot.tickets?.map(data => Ticket.createFromSnapshot(data));
        user.userInqueries = snapshot.userInqueries && UserInquery.createFromSnapshot(snapshot.userInqueries);

        return user;
    };

    public get name(): string {
        return this._name;
    };
    public set name(value: string) {
        this._name = value;
    };

    public get lastName(): string {
        return this._lastName;
    };
    public set lastName(value: string) {
        this._lastName = value;
    };

    public get nationalId(): string {
        return this._nationalId;
    };
    public set nationalId(value: string) {
        this._nationalId = value;
    };

    public get mobile(): string {
        return this._mobile;
    };
    public set mobile(value: string) {
        this._mobile = value;
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

    public get bankAccounts() {
        return this._bankAccounts;
    };
    public set bankAccounts(value) {
        this._bankAccounts = value;
    };

    public get tickets() {
        return this._tickets;
    };
    public set tickets(value) {
        this._tickets = value;
    };

    public get userInqueries() {
        return this._userInqueries;
    };
    public set userInqueries(value) {
        this._userInqueries = value;
    };
}

export default User;