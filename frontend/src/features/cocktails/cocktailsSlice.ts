import {createSlice} from "@reduxjs/toolkit";
import {
    changeCocktailPublish,
    createCocktail,
    deleteCocktail,
    fetchAllCocktail,
    fetchPublishedCocktail, fetchUsersCocktail
} from "./cocktailsThunk";
import {RootState} from "../../app/store";
import {Cocktail} from "../../types";

interface CocktailsState {
    publishedItems: Cocktail[],
    items: Cocktail[],
    usersItems:Cocktail[],
    fetchAllLoading: boolean;
    fetchAllUsersLoading: boolean;
    fetchPublishedLoading: boolean;
    createLoading: boolean;
    changeLoading: boolean;
    deleteLoading: boolean;
}

const initialState: CocktailsState = {
    publishedItems:[],
    items:[],
    usersItems:[],
    fetchAllLoading:false,
    fetchAllUsersLoading: false,
    fetchPublishedLoading: false,
    createLoading:false,
    changeLoading: false,
    deleteLoading: false
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
            state.publishedItems = cocktails;
        });
        builder.addCase(fetchPublishedCocktail.rejected, (state) => {
            state.fetchPublishedLoading = false;
        });

        builder.addCase(fetchAllCocktail.pending, (state) => {
            state.fetchAllLoading = true;
        });
        builder.addCase(fetchAllCocktail.fulfilled, (state, { payload: cocktails }) => {
            state.fetchAllLoading = false;
            state.items = cocktails;
        });
        builder.addCase(fetchAllCocktail.rejected, (state) => {
            state.fetchAllLoading = false;
        });

        builder.addCase(fetchUsersCocktail.pending, (state) => {
            state.fetchAllUsersLoading = true;
        });
        builder.addCase(fetchUsersCocktail.fulfilled, (state, { payload: cocktails }) => {
            state.fetchAllUsersLoading = false;
            state.usersItems = cocktails;
        });
        builder.addCase(fetchUsersCocktail.rejected, (state) => {
            state.fetchAllUsersLoading = false;
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

        builder.addCase(changeCocktailPublish.pending, (state) => {
            state.changeLoading = true;
        });
        builder.addCase(changeCocktailPublish.fulfilled, (state) => {
            state.changeLoading = false;
        });
        builder.addCase(changeCocktailPublish.rejected, (state) => {
            state.changeLoading = false;
        });

        builder.addCase(deleteCocktail.pending, (state) => {
            state.deleteLoading = true;
        });
        builder.addCase(deleteCocktail.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteCocktail.rejected, (state) => {
            state.deleteLoading = false;
        });
    }
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const selectCreateCocktailLoading = (state: RootState) => state.cocktailsReducer.createLoading;
export const selectPublishedCocktails = (state: RootState) => state.cocktailsReducer.publishedItems;
export const selectPublishedCocktailsLoading = (state: RootState) => state.cocktailsReducer.fetchPublishedLoading;
export const selectCocktails = (state: RootState) => state.cocktailsReducer.items;
export const selectCocktailsLoading = (state: RootState) => state.cocktailsReducer.fetchAllLoading;
export const selectUsersCocktails =(state: RootState) => state.cocktailsReducer.usersItems;
export const selectUsersCocktailsLoading = (state: RootState) => state.cocktailsReducer.fetchAllLoading;