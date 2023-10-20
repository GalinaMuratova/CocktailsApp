import React from 'react';
import { Link as NavLink } from 'react-router-dom';
import {Button, Card, CardContent, CardMedia, Grid, styled, Typography} from "@mui/material";


const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit',
    },
});

interface Props {
    id: string,
    name: string,
    image: string,
    published?: boolean
}

const CocktailBlock: React.FC<Props> = ({id, image, name}) => {
    let artistImage = 'http://localhost:8000' + '/images/' + image;
    return (
        <>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card>
                    <CardContent>
                        <CardMedia
                            sx={{ height: 240 }}
                            image={artistImage}
                            title={name}
                            component={Link}
                            to={'/cocktails/' + id}
                        />
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Button variant="outlined"  style={{ marginRight: '20px' }} >
                            Posted
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
};

export default CocktailBlock;