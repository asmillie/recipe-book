export interface IIngredient {
    id: number;
    name: string;
    amount: number;
    unit: string;
}

export class Ingredient {
    private id: number;
    private name: string;
    private amount: number;
    private unit: string;

    constructor(id: number, name: string, amount: number, unit: string) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.unit = unit;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getAmount(): number {
        return this.amount;
    }

    public getUnit(): string {
        return this.unit;
    }

    public setId(id: number) {
        this.id = id;
    }

    public setName(name: string) {
        this.name = name;
    }

    public setAmount(amt: number) {
        this.amount = amt;
    }

    public setUnit(unit: string) {
        this.unit = unit;
    }
}
