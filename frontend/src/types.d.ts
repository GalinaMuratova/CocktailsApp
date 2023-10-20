
export interface RegisterMutation {
    email: string;
    password: string;
    displayName: string;
    avatar: string | null;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export interface User {
    _id: string;
    email: string;
    token: string;
    role: string;
    avatar: string | null;
    displayName: string;
}

interface Ingredient {
    ingredientName: string;
    quantity: string;
}

export interface Cocktail {
    _id: string,
    user: string,
    name: string,
    image: string|null,
    recipe: string,
    published: boolean,
    ingredients: [{
        ingredientName: string,
        quantity: string
    }]
}

export interface CocktailMutationNew {
    name: string,
    image: string|null,
    recipe: string,
    ingredients: Ingredient[]
}

export interface CocktailMutation {
    name: string,
    image: string|null,
    recipe: string,
    ingredients: []
}

export interface RegisterResponse {
    user: User;
    message: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}
