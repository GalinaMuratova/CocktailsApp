import {createSlice} from "@reduxjs/toolkit";
import {createCocktail, fetchPublishedCocktail} from "./cocktailsThunk";
import {RootState} from "../../app/store";
import {Cocktail} from "../../types";

interface CocktailsState {
    items: Cocktail[]
    fetchPublishedLoading: boolean;
    createLoading: boolean;
}

const initialState: CocktailsState = {
    items:[],
    fetchPublishedLoading: false,
    createLoading:false
}

export const cocktailsSlice = createSlice({
    name:'cocktails',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchPublishedCocktail.pending, (state) => {
            state.fetchPublishedLoading = true;
        });
        builder.addCase(fetchPublishedCocktail.fulfilled, (state, { payload: cocktails }) => {
            state.fetchPublishedLoading = false;
            state.items = cocktails;
        });
        builder.addCase(fetchPublishedCocktail.rejected, (state) => {
            state.fetchPublishedLoading = false;
        });

        builder.addCase(createCocktail.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createCocktail.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createCocktail.rejected, (state) => {
            state.createLoading = false;
        });
    }
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const selectCreateCocktailLoading = (state: RootState) => state.cocktailsReducer.createLoading;
export const selectPublishedCocktails = (state: RootState) => state.cocktailsReducer.items;
export const selectPublishedCocktailsLoading = (state: RootState) => state.cocktailsReducer.fetchPublishedLoading;