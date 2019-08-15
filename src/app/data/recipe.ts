import { Ingredient } from './ingredient';

export class Recipe {
    private id: string;
    private data: {
        name: string;
        description: string;
        imagePath: string;
        ingredients: Ingredient[];
    }

    constructor(id: string, name: string, desc: string, imgPath: string, ingredients: Ingredient[] = []) {
        this.id = id;
        this.data.name = name;
        this.data.description = desc;
        this.data.imagePath = imgPath;
        this.data.ingredients = ingredients;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.data.name;
    }

    public getDescription(): string {
        return this.data.description;
    }

    public getImagePath(): string {
        return this.data.imagePath;
    }

    public getIngredients(): Ingredient[] {
        return this.data.ingredients;
    }

    public setName(name: string) {
        this.data.name = name;
    }

    public setDescription(desc: string) {
        this.data.description = desc;
    }

    public setImagePath(path: string) {
        this.data.imagePath = path;
    }

    public setIngredients(ingredients: Ingredient[]) {
        this.data.ingredients = ingredients;
    }
}
