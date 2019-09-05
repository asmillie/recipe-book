import { Ingredient, IIngredient } from './ingredient';

export interface IRecipe {
    name: string;
    description: string;
    imagePath: string;
    ingredients: IIngredient[];
}

export class Recipe {
    private id: string;
    private name: string;
    private description: string;
    private imagePath: string;
    private ingredients: Ingredient[];

    constructor(id: string, name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
    // TODO: refactor getter and setters to typescript format
    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getImagePath(): string {
        return this.imagePath;
    }

    public getIngredients(): Ingredient[] {
        return this.ingredients;
    }

    public setId(id: string) {
        this.id = id;
    }

    public setName(name: string) {
        this.name = name;
    }

    public setDescription(desc: string) {
        this.description = desc;
    }

    public setImagePath(path: string) {
        this.imagePath = path;
    }

    public setIngredients(ingredients: Ingredient[]) {
        this.ingredients = ingredients;
    }
}
