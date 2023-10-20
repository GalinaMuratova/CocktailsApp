import React, {useEffect, useState} from 'react';
import {Grid, TextField, Button, Typography} from '@mui/material';
import {CocktailMutation, Ingredient} from "../../../types";
import FileInput from "../../../components/UI/FileInput/FileInput";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useNavigate} from "react-router-dom";
import {selectCreateCocktailLoading} from "../cocktailsSlice";
import {createCocktail} from "../cocktailsThunk";
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import {selectUser} from "../../users/userSlice";


const CocktailForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectCreateCocktailLoading);
    const [ingredients, setIngredients] = useState<Ingredient[]>([{
        ingredientName: '',
        quantity: ''
    }]);
    const [cocktail, setCocktail] = useState<CocktailMutation>({
        name: '',
        image: '',
        recipe: '',
        ingredients: [],
    });
    const user = useAppSelector(selectUser);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCocktail((prevCocktail: any) => ({
            ...prevCocktail,
            [name]: value,
        }));
    };

    const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const newIngredients = [...ingredients];
        newIngredients[index] = { ...newIngredients[index], [name]: value };
        setIngredients(newIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { ingredientName: '', quantity: '' }]);
    };

    const handleRemoveIngredient = (index: number) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newCocktail = { ...cocktail, ingredients: ingredients };
        try {
            await dispatch(createCocktail(newCocktail)).unwrap();
            alert('Your cocktail is being reviewed by a moderator');
            navigate('/');
        } catch (e) {
            alert('Invalid field')
        }
    };

    const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setCocktail((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <Grid container spacing={2} direction='column' style={{backgroundColor:'aliceblue', borderRadius:'8px', padding:'20px'}}>
                <Typography variant='h5'>Add cocktail</Typography>
                <Grid item>
                    <TextField
                        label='Cocktail Name'
                        name='name'
                        id='name'
                        value={cocktail.name}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label='Recipe'
                        name='recipe'
                        value={cocktail.recipe}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                        required />
                </Grid>
                <Grid item xs>
                    <FileInput onChange={filesInputChangeHandler} name="image" label="image" />
                </Grid>
                <Grid item>
                    <h3>Ingredients</h3>
                    <Button variant='outlined' onClick={handleAddIngredient}>
                        Add Ingredient
                    </Button>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} style={{display:'flex', justifyContent:'space-around', margin:'10px 0'}}>
                            <TextField
                                label='Ingredient Name'
                                name='ingredientName'
                                value={ingredient.ingredientName}
                                style={{margin:'0 10px 0 0'}}
                                required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleIngredientChange(e, index)}
                            />
                            <TextField
                                label='Quantity'
                                name='quantity'
                                value={ingredient.quantity}
                                style={{margin:'0 10px 0 0'}}
                                required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleIngredientChange(e, index)}
                            />
                            <Button variant='outlined' style={{padding:'0 30px'}} color="error" onClick={() => handleRemoveIngredient(index)}>
                                Remove
                            </Button>
                        </div>
                    ))}
                </Grid>
                <Grid item xs>
                    <LoadingButton
                        type="submit"
                        size="small"
                        endIcon={<SendIcon />}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                    >
                        <span>Send</span>
                    </LoadingButton>
                </Grid>
            </Grid>
        </form>
    );
};

export default CocktailForm;


