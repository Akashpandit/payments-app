import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Box, Button, } from '@mui/material';
import { useStyles } from './Utils';

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/Index';


const NavBar = () => {



    let dispatch = useDispatch();



    const isLoggedIn = useSelector(state => state.isLoggedIn);

    return (
        <AppBar position="sticky" sx={{ background: "linear-gradient(90deg, rgba(7,0,155,1) 3%, rgba(0,30,191,1) 48%, rgba(45,32,230,1) 100%)" }}>
            <Toolbar>
                {isLoggedIn ? (

                    <Button variant='text' sx={{ color: "white" }} LinkComponent={Link} to='/payments'>
                        MyPayments
                    </Button>
                ) : (
                    <Button variant='text' sx={{ color: "white" }} LinkComponent={Link} to='/auth'>
                        MyPayments
                    </Button>
                )}

                <Box display='flex' marginLeft='auto'>
                    {!isLoggedIn && (
                        <>
                            {" "}

                            <Button size='small' variant="contained" sx={{ margin: 1, borderRadius: 2, backgroundColor: "blue" }} LinkComponent={Link} to="/admin/addNewClient">Signup</Button>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <Button variant='contained' color='warning' size='small' sx={{

                                margin: 1, borderRadius: 2, background: "purple", color: 'white', backgroundColor: 'transparent', borderColor: "white", border: "1px solid"
                            }} LinkComponent={Link} to='/payments/add'>Add Payment</Button>
                            <Button size='small' onClick={() => dispatch(authActions.logout())} color="warning" variant="contained" sx={{ margin: 1, borderRadius: 2, backgroundColor: 'transparent' }} LinkComponent={Link} to="/auth">Logout</Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )


}

export default NavBar