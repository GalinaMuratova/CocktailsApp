import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectPublishedCocktails, selectPublishedCocktailsLoading} from "./cocktailsSlice";
import {CircularProgress, Grid} from "@mui/material";
import CocktailBlock from "./components/CocktailBlock";
import {fetchPublishedCocktail} from "./cocktailsThunk";

const Cocktails = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(selectPublishedCocktails);
    const loading = useAppSelector(selectPublishedCocktailsLoading);

    useEffect(() => {
        dispatch(fetchPublishedCocktail());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <Grid container item spacing={2}>
                    {cocktails.map((el) => (
                        <CocktailBlock id={el._id} name={el.name} image={el.image!} />
                    ))}
                </Grid>
            )}
        </>
    );
};

export default Cocktails;