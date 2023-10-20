import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUsersCocktails, selectUsersCocktailsLoading } from './cocktailsSlice';
import { fetchUsersCocktail } from './cocktailsThunk';
import { CircularProgress, Grid } from '@mui/material';
import CocktailBlock from './components/CocktailBlock';

const UsersCocktailsPage = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectUsersCocktails);
  const loading = useAppSelector(selectUsersCocktailsLoading);

  useEffect(() => {
    dispatch(fetchUsersCocktail());
  }, [dispatch]);

  return (
    <>
      <h2>My cocktails</h2>
      {loading ? (
        <Grid item container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container item spacing={2}>
          {cocktails.map((el) => (
            <CocktailBlock
              id={el._id}
              name={el.name}
              image={el.image}
              key={el._id}
              published={el.published}
            />
          ))}
        </Grid>
      )}
    </>
  );
};

export default UsersCocktailsPage;
