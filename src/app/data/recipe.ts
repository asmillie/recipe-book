export class Recipe {
    private name: string;
    private description: string;
    private imagePath: string;

    constructor(name: string, desc: string, imgPath: string) {
        this.name = name;
        this.description = desc;
        this.imagePath = imgPath;
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
}