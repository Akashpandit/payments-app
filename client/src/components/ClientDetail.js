import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Button, Grid, Items, Item, Paper, Avatar, CardHeader, CardContent } from '@mui/material';
import { useStyles } from './Utils';
import { deepOrange, deepPurple } from '@mui/material/colors';


import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/Index';

const ClientDetail = () => {

    return (
        <>
            <Paper elevation={2} sx={{ margin: "auto", width: "90%", marginTop: 2 }}>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} p={2}>

                    <Grid item xs={12} display="flex" direction={"row"}  >
                        <Avatar sx={{ bgcolor: "purple" }}>{localStorage.getItem("clientName").charAt(0)}</Avatar>


                        <Typography marginLeft={1} marginTop={1} variant='h5' color={"primary"}>{localStorage.getItem("clientName")}
                        </Typography>


                    </Grid>
                    <Grid item xs={12}><hr color='purple' />
                    </Grid>
                    <Grid item xs={8} >


                        <Typography variant='subtitle1' color={"secondary"}>Contact Number: {localStorage.getItem("clientContact")} </Typography>


                    </Grid>
                    <Grid item xs={4} >
                        <Typography variant='subtitle1' color={"secondary"}>Area: {localStorage.getItem("clientArea")} </Typography>

                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant='subtitle1' color={"secondary"}>Description: {localStorage.getItem("clientDesc")} </Typography>

                    </Grid>


                </Grid>
                <Grid textAlign={"center"} >

                    <Button variant='outlined' sx={{ margin: 2 }} LinkComponent={Link} to='/payments'>Go To Payments</Button>
                </Grid>
            </Paper></>
        // <Box>
        //     <Typography>Hello {localStorage.getItem("clientName")}</Typography>
        // </Box>

    )
}

export default ClientDetail