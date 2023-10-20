import {createAsyncThunk} from "@reduxjs/toolkit";
import { CocktailMutationNew} from "../../types";
import axiosApi from "../../axiosApi";

export const createCocktail = createAsyncThunk<void, CocktailMutationNew>(
    'cocktails/create',
    async (cocktailMut) => {
        const formData = new FormData();

        const keys = Object.keys(cocktailMut) as (keyof CocktailMutationNew)[];

        keys.forEach((key) => {
            const value = cocktailMut[key];

            if (key === 'ingredients') {
                formData.append(key, JSON.stringify(value));
            } else if (value !== null) {
                formData.append(key, value as string);
            }
        });

        await axiosApi.post('/cocktails', formData);
    },
);


