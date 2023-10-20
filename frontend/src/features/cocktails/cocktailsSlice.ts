import {createSlice} from "@reduxjs/toolkit";
import {createCocktail} from "./cocktailsThunk";
import {RootState} from "../../app/store";

interface CocktailsState {
    createLoading: boolean;
}

const initialState: CocktailsState = {
    createLoading:false
}

export const cocktailsSlice = createSlice({
    name:'cocktails',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
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