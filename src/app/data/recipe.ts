export class Recipe {
    private id: number;
    private name: string;
    private description: string;
    private imagePath: string;

    constructor(id: number, name: string, desc: string, imgPath: string) {
        this.id = id;
        this.name = name;
        this.description = desc;
        this.imagePath = imgPath;
    }

    public getId(): number {
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
}