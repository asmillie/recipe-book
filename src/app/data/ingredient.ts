export interface IIngredient {
    id?: string;
    name: string;
    amount: number;
    unit: string;
}

export class Ingredient {
    private _id: string;
    private _name: string;
    private _amount: number;
    private _unit: string;

    constructor(id: string, name: string, amount: number, unit: string) {
        this._id = id;
        this._name = name;
        this._amount = amount;
        this._unit = unit;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get amount(): number {
        return this._amount;
    }

    get unit(): string {
        return this._unit;
    }

    set id(id: string) {
        this._id = id;
    }

    set name(name: string) {
        this._name = name;
    }

    set amount(amt: number) {
        this._amount = amt;
    }

    set unit(unit: string) {
        this._unit = unit;
    }
}
