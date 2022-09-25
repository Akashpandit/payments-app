import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid, Paper, Avatar } from '@mui/material';


const UserDetail = () => {

    return (
        <>
            <Paper elevation={2} sx={{ margin: "auto", width: "90%", marginTop: 2 }}>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} p={2}>

                    <Grid container item xs={12} display="flex" direction={"row"} alignItems="center"  >
                        <Avatar sx={{ bgcolor: "purple" }}>{localStorage.getItem("userName").charAt(0)}</Avatar>


                        <Typography marginLeft={1} marginTop={1} variant='h4' color={"primary"}>{localStorage.getItem("userName")}
                        </Typography>


                    </Grid>
                    <Grid item xs={12}><hr color='purple' />
                    </Grid>
                    <Grid item xs={4} >


                        <Typography variant='body1'> <b> Contact Number: </b>{localStorage.getItem("userContact")} </Typography>


                    </Grid>
                    <Grid item xs={4} >


                        <Typography variant='body1'> <b> Email: </b>{localStorage.getItem("userEmail")} </Typography>


                    </Grid>
                    <Grid item xs={4} >
                        <Typography variant='body1' ><b> Area:</b> {localStorage.getItem("userArea")} </Typography>

                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant='body1' ><b> Description: </b> {localStorage.getItem("userDesc")} </Typography>

                    </Grid>


                </Grid>
                <Grid textAlign={"center"} >

                    <Button variant='contained' sx={{ margin: 2, borderRadius: 2, backgroundColor: "#0000ff" }} LinkComponent={Link} to='/clients'>Go To Clients</Button>
                </Grid>
            </Paper></>


    )
}

export default UserDetail