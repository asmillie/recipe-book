import { Ingredient } from './ingredient';

export class Recipe {
    private id: string;
    private name: string;
    private description: string;
    private imagePath: string;
    private ingredients: Ingredient[];

    constructor(id: string, name: string, desc: string, imgPath: string, ingredients: Ingredient[] = []) {
        this.id = id;
        this.name = name;
        this.description = desc;
        this.imagePath = imgPath;
        this.ingredients = ingredients;
    }

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
