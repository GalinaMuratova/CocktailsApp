export interface IUser {
    displayName: string;
    email: string;
    password: string;
    token: string;
    role: string;
    googleID?: string;
    avatar: string | null;
}
export interface Ingredient {
    ingredientName: string;
    quantity: string;
}