export interface IIngredient {
    id?: string;
    name: string;
    amount: number;
    unit: string;
}

export class Ingredient {
    private id: string;
    private name: string;
    private amount: number;
    private unit: string;

    constructor(id: string, name: string, amount: number, unit: string) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.unit = unit;
    }
    // TODO: Refactor getter and setters to utilize Typescript
    public getId(): string {
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

    public setId(id: string) {
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
