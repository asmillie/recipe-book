import { IngredientResponse } from './ingredient-response';

export interface RecipeResponse {
    id: number;
    name: string;
    description: string;
    imagePath: string;
    ingredients: IngredientResponse[];
}
