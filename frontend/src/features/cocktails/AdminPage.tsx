import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAllCocktail } from './cocktailsThunk';
import { selectCocktails, selectCocktailsLoading } from './cocktailsSlice';
import { CircularProgress, Grid } from '@mui/material';
import AdminCocktailBlock from './components/AdminCocktailBlock';
import { selectUser } from '../users/userSlice';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const loading = useAppSelector(selectCocktailsLoading);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(fetchAllCocktail());
  }, [dispatch]);
  return (
    <>
      <h2>Admin Page</h2>
      {loading ? (
        <Grid item container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container item spacing={2}>
          {cocktails.map((el) => (
            <AdminCocktailBlock
              key={el._id}
              id={el._id}
              name={el.name}
              image={el.image}
              published={el.published}
            />
          ))}
        </Grid>
      )}
    </>
  );
};

export default AdminPage;
