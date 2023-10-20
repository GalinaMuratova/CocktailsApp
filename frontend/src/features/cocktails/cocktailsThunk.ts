import {createAsyncThunk} from "@reduxjs/toolkit";
import {Cocktail, CocktailMutationNew} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchPublishedCocktail = createAsyncThunk<Cocktail[]>('cocktails/fetchAllPublished', async () => {
    const artistsResponse = await axiosApi.get<Cocktail[]>('/cocktails/published');
    return artistsResponse.data;
});
export const fetchAllCocktail = createAsyncThunk<Cocktail[]>('cocktails/fetchAll', async () => {
    const artistsResponse = await axiosApi.get<Cocktail[]>('/cocktails');
    return artistsResponse.data;
});
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

export const changeCocktailPublish = createAsyncThunk<void, string>(
    'cocktails/changePublish',
    async (id) => {
        await axiosApi.patch(`/cocktails/${id}/togglePublished`);
    },
);

export const deleteCocktail = createAsyncThunk<void, string>(
    'cocktails/delete',
    async (id) => {
    await axiosApi.delete(`/cocktails/${id}`);
    }
);



