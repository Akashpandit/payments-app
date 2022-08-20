import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, CardHeader, CardMedia, Box, Button } from '@mui/material';
import { useStyles } from "./Utils";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { padding } from "@mui/system";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const Payment = ({ amount, date, description, paymentMode, isClient, id }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/myPayments/${id}`);
    }
    //save client detail to local storage

    const deleteRequest = async () => {
        const res = await axios
            .delete(`/api/payment/delete/${id}`)
            .catch((err) => console.log(err))

        const data = await res.data;
        return data;
    }

    const handleDelete = () => {


        if (window.confirm("Are you sure?")) {
            deleteRequest()
                .then(() => navigate("/"))
                .then(() => navigate("/payments"))
        }


    }

    //set total amount

    let curAmt = parseInt(localStorage.getItem("totalSum"))
    localStorage.setItem("totalSum", curAmt + parseInt(amount))
    window.onunload = function () {
        localStorage.removeItem('totalSum');
        localStorage.setItem('totalSum', 0);
    }


    let datestr = date + "";
    datestr = datestr.substring(0, 10);
    const d = new Date(date);
    let dayToday = d.getDay();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //formatting the amount
    let x = amount + ""
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== '')
        lastThree = ',' + lastThree;
    var amountFormatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;




    return (
        <div >
            <Paper
                sx={{
                    width: "90%",
                    margin: "auto",
                    marginTop: 2,
                    padding: 2,
                    flexGrow: 1,
                    boxShadow: "5px 5px 10px #ccc",
                    ":hover": {
                        boxShadow: "10px 10px 20px #ccc",
                    },
                }}
            >
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase sx={{ width: 50, height: 50 }}>

                            {(paymentMode === "Cash") ? (<Img alt="Cash" src={process.env.PUBLIC_URL + '/cash-icon.png'} />) : (<Img alt="Cheque" src={process.env.PUBLIC_URL + '/cheque.png'} />)}

                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>

                            <Grid

                                item xs container direction="row">
                                <Typography
                                    sx={{
                                        marginBottom: 0, padding: 0, marginTop: 0

                                    }}
                                    gutterBottom variant="h5" >
                                    {datestr} &#8226;
                                </Typography>
                                <Typography
                                    sx={{
                                        marginBottom: 0,
                                        padding: 0,
                                        marginTop: 0,

                                    }}
                                    variant="subtitle1" >
                                    {weekday[dayToday]}
                                </Typography>
                            </Grid>
                            <Grid item sx>
                                <Typography

                                    variant="body2" >

                                    {description}
                                </Typography>


                                <Typography variant="body2" color="text.secondary">
                                    {paymentMode}
                                </Typography>


                            </Grid>
                        </Grid>
                        <Grid item sx={{
                            textAlign: "center"
                        }}>
                            <Box>
                                <Typography
                                    sx={{
                                        color: "#422ade",
                                        borderRadius: "4px",
                                        textAlign: "end"
                                    }}
                                    variant="h4" component="div">
                                    &#8377; {amountFormatted}
                                </Typography>

                                <Button variant="outlined" size="small" onClick={handleEdit} sx={{ marginLeft: 1 }} color="primary">
                                    Edit
                                </Button>
                                <Button
                                    sx={{
                                        marginLeft: 1,
                                        ":hover": {
                                            backgroundColor: "red",
                                            color: "white"

                                        }
                                    }}
                                    variant="outlined" size="small" onClick={handleDelete} color="error">
                                    Delete
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

        </div>
    )

}

export default Payment