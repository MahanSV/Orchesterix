import BaseModel from '#models/base/baseModel.ts';

export interface FAQConstructorParams {
    id: string;
    question: string;
    answer: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface FAQSnapshotParams {
    id: string;
    question: string;
    answer: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

class FAQ extends BaseModel {
    private _question!: string;
    private _answer!: string;
    private _order!: number;
    private _createdAt!: Date;
    private _updatedAt!: Date;

    constructor() {
        super();
    };

    static create(params: FAQConstructorParams): FAQ {
        const faq = new FAQ();

        if (params?.id) {
            faq.id = params?.id;
        }

        faq.question = params.question;
        faq.answer = params.answer;
        faq.order = params.order;
        faq.createdAt = params.createdAt;
        faq.updatedAt = params.updatedAt;

        return faq;
    };

    static createFromSnapshot(snapshot: FAQSnapshotParams): FAQ {
        const faq = new FAQ();

        faq.id = snapshot.id;
        faq.question = snapshot.question;
        faq.answer = snapshot.answer;
        faq.order = snapshot.order;
        faq.createdAt = snapshot.createdAt;
        faq.updatedAt = snapshot.updatedAt;

        return faq;
    };

    public get question() {
        return this._question;
    };
    public set question(value) {
        this._question = value;
    };

    public get answer() {
        return this._answer;
    };
    public set answer(value) {
        this._answer = value;
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
}

export default FAQ;
