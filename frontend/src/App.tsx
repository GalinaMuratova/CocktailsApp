import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import {Route, Routes} from "react-router-dom";
import Cocktails from "./features/cocktails/Cocktails";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import CocktailForm from "./features/cocktails/components/CocktailsForm";
import AdminPage from "./features/cocktails/AdminPage";

function App() {
    return (
        <>
            <CssBaseline/>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Container>
                    <Routes>
                        <Route path='/' element={< Cocktails/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/cocktails/new' element={<CocktailForm />} />
                        <Route path='/cocktails/admin' element={<AdminPage />} />
                    </Routes>
                </Container>
            </main>
        </>
    );
}

export default App;
