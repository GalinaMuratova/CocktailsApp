import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useParams} from "react-router-dom";
import {selectOneCocktail, selectOneCocktailLoading} from "./cocktailsSlice";
import {fetchOneCocktail} from "./cocktailsThunk";
import {Card, CardContent, CircularProgress, Container, Grid, Typography} from "@mui/material";

const OneCocktailInformation = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const cocktail = useAppSelector(selectOneCocktail);
    const loading = useAppSelector(selectOneCocktailLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchOneCocktail(id))
        }
    }, [dispatch, id]);
    const cocktailImage = 'http://localhost:8000'+ '/images/' + cocktail?.image;

    return (
        <>
            {loading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <Container>
                    <Card>
                        <Grid>
                            <CardContent>
                                <Grid container flexDirection='row' >
                                    <Grid item style={{ height:'380px', maxWidth:'360px', width:'auto', borderRadius:'8px', overflow: 'hidden', margin:'20px 30px 0 0'}}>
                                        {cocktail?.image && (
                                            <img
                                                src={cocktailImage}
                                                alt={cocktail?.name}
                                                style={{ height:'100%', width:'100%', objectFit: 'cover' }}
                                            />
                                        )}
                                    </Grid>
                                    <Grid item container display='flex' flexDirection='column' flexWrap='wrap' width='60%'>
                                        <Typography style={{margin:'20px 5px 20px 0', fontSize:'35px', fontWeight:'bold'}} variant='h5' component='div'>
                                            {cocktail?.name}
                                        </Typography>
                                        <Typography variant="h5">
                                            <Typography  variant="h5" style={{color: 'grey'}}>Ingredients:</Typography>
                                            { cocktail?.ingredients.map((el) => (
                                                <Grid item container flexDirection='row' marginTop='auto'>
                                                    <Typography variant='h6' fontWeight='bold'>{el.ingredientName} :</Typography>
                                                    <Typography variant='h6'  marginRight='20px'>{el.quantity} </Typography>
                                                </Grid>
                                            )) }
                                        </Typography>
                                        <Grid style={{ padding:'20px 0 20px 0', margin:'20px 0 0 0'}}>
                                            <Typography  variant="h5" style={{color: 'grey'}}>Recipe:</Typography>
                                            <Typography gutterBottom variant="h6" component="div" >
                                                { cocktail?.recipe}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Grid>
                    </Card>
                </Container>
            )}
            
        </>
    );
};

export default OneCocktailInformation;