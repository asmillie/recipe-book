import { Ingredient, IIngredient } from './ingredient';

export interface IRecipe {
    name: string;
    description: string;
    imagePath: string;
    ingredients: IIngredient[];
}

export class Recipe {
    private _id: string;
    private _name: string;
    private _description: string;
    private _imagePath: string;
    private _ingredients: Ingredient[];

    constructor(id: string, name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._imagePath = imagePath;
        this._ingredients = ingredients;
    }
    // TODO: refactor getter and setters to typescript format
    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get imagePath(): string {
        return this._imagePath;
    }

    get ingredients(): Ingredient[] {
        return this._ingredients;
    }

    set id(id: string) {
        this._id = id;
    }

    set name(name: string) {
        this._name = name;
    }

    set description(desc: string) {
        this._description = desc;
    }

    set imagePath(path: string) {
        this._imagePath = path;
    }

    set ingredients(ingredients: Ingredient[]) {
        this._ingredients = ingredients;
    }
}
