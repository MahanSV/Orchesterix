import BaseModel from '#models/base/baseModel.ts';
import User, {UserSnapshotParams} from "#models/User.ts";


export interface UserInqueryConstructorParams {
    id: string;
    point?: string;
    guarantees: any;
    totalTurnover: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export interface UserInquerySnapshotParams {
    id: string;
    point?: string;
    guarantees: any;
    totalTurnover: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user: UserSnapshotParams;
}

class UserInquery extends BaseModel {
    private _point?: string;
    private _guarantees!: any;
    private _totalTurnover!: number;
    private _createdAt!: Date;
    private _updatedAt!: Date;
    private _userId!: string;
    private _user!: User;

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
        userInquery.totalTurnover = snapshot.totalTurnover;
        userInquery.createdAt = snapshot.createdAt;
        userInquery.updatedAt = snapshot.updatedAt;
        userInquery.userId = snapshot.userId;
        userInquery.user = User.createFromSnapshot(snapshot.user);

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