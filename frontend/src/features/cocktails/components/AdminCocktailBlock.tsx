import React from 'react';
import {Button, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {useAppDispatch} from "../../../app/hooks";
import {changeCocktailPublish, deleteCocktail, fetchAllCocktail} from "../cocktailsThunk";

interface Props {
    id: string,
    name: string,
    image: string,
    published: boolean
}

const AdminCocktailBlock: React.FC<Props> = ({id, image, name, published}) => {
    let artistImage = 'http://localhost:8000' + '/images/' + image;
    const dispatch = useAppDispatch();

    const onPublic = async () => {
        await dispatch(changeCocktailPublish(id));
        await dispatch(fetchAllCocktail());
    };

    const onDelete = async () => {
        const alert = window.confirm('Do you want to delete this artist?');
        if (alert) {
            await dispatch(deleteCocktail(id));
            await dispatch(fetchAllCocktail());
        }
    };

    return (
        <>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card>
                    <CardContent>
                        <CardMedia
                            sx={{ height: 240 }}
                            image={artistImage}
                            title={name}
                        />
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        {published ? (
                            <div style={{display: "flex"}}>
                                <Button variant="outlined" style={{ marginRight: '4px' }} >
                                    Posted
                                </Button>
                                <Button variant="outlined" style={{ marginRight: '4px' }} onClick={onPublic}>
                                    To unpublished
                                </Button>
                                <Button onClick={onDelete} variant="outlined" color="error" >
                                    Delete
                                </Button>
                            </div>
                        ) : (
                            <div style={{display: "flex"}}>
                                <Button
                                    variant="outlined"
                                    style={{ color: 'gray', borderColor: 'gray', marginRight: '5px' }}
                                >
                                    Not published
                                </Button>
                                <Button onClick={onPublic} variant="outlined" style={{marginRight:'5px'}}>
                                    Public
                                </Button>
                                <Button onClick={onDelete} variant="outlined" color="error">
                                    Delete
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </Grid>

        </>
    );
};

export default AdminCocktailBlock;