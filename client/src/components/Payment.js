import * as React from 'react';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Button, Divider } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AlertBox from './AlertBox';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const Payment = ({ amount, date, description, paymentMode, paymentType, isClient, id }) => {
    const navigate = useNavigate();


    //alert box
    const [openAlert, setOpenAlert] = useState(false);


    const handleEdit = () => {
        navigate(`/myPayments/${id}`);
    }
    //save client detail to local storage

    const deleteRequest = async () => {
        const res = await axios
            .delete(`${process.env.REACT_APP_BASEURL}/api/payment/delete/${id}`)
            .catch((err) => console.log(err))

        const data = await res.data;
        return data;
    }

    const handleDelete = () => {


        if (window.confirm("Are you sure?")) {
            deleteRequest()
                .then(setOpenAlert(true))
                .then(() => navigate("/"))
                .then(() => navigate("/client/payments"))
                .then(() => window.location.reload())
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
            <AlertBox
                title="Success"
                children="Amount Deleted"
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
            ></AlertBox>
            <Paper
                sx={{
                    width: "88%",
                    margin: "auto",
                    marginTop: 2,
                    padding: 1,
                    flexGrow: 1,
                    boxShadow: "1px 2px 10px #ccc",
                    ":hover": {
                        boxShadow: "10px 10px 20px #ccc",
                    },
                }}
            >
                <Grid spacing={2} display="flex" flexDirection={"row"}>
                    <Grid paddingRight={"6px"} display={'flex'} flexDirection="row" alignContent={"center"} alignItems="center" justifyContent={'center'} >

                        <ButtonBase sx={{ width: "40px" }}>

                            {(paymentMode === "Cash") ? (<Img alt="Cash" src={process.env.PUBLIC_URL + '/cash-icon.png'} />) : (<Img alt="Cheque" src={process.env.PUBLIC_URL + '/cheque.png'} />)}

                        </ButtonBase>
                    </Grid>
                    <Grid display={"flex"} flexGrow={1} alignContent={"center"} alignItems="center">
                        <Grid display={"flex"} flexDirection="column" >
                            <Grid display={"flex"} flexDirection="column" alignContent={"center"} alignItems="left">
                                <Typography
                                    sx={{
                                        marginBottom: 0, padding: 0, marginTop: 0

                                    }}
                                    gutterBottom variant="h6" >
                                    {datestr}
                                </Typography>
                                <Typography
                                    sx={{
                                        marginBottom: 0,
                                        padding: 0,
                                        marginTop: 0,

                                    }}
                                    variant="subtitle2" >
                                    {weekday[dayToday]} &#8226; {paymentMode}
                                    <Divider />
                                </Typography>

                            </Grid>
                            <Grid display={"flex"} flexDirection="column">

                                <Typography style={{ overflowWrap: 'break-word' }}

                                    variant="body2" >

                                    {description}
                                </Typography>

                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid xs={4} display={"flex"} flexDirection="column" alignItems="end" justifyContent={'center'} sx={{ padding: "1px" }}>

                        <Typography
                            sx={{
                                color: "#422ade",
                                paddingRight: "1px",
                                fontSize: "125%"


                            }}
                        >
                            <b> &#8377; {amountFormatted} </b>
                        </Typography>


                        <Grid display={"flex"} mt={"7px"} >
                            <Button sx={{ padding: "0px", borderRight: "1px solid", borderRadius: 0 }} onClick={handleEdit} endIcon={<Img alt="edit" width={"20px"} src={process.env.PUBLIC_URL + '/edit.png'} />}></Button>
                            <Button sx={{ padding: "0px" }} onClick={handleDelete} startIcon={<Img alt="edit" width={"20px"} src={process.env.PUBLIC_URL + '/delete.png'} />}> </Button>
                        </Grid>

                    </Grid>

                </Grid>

                {/* <Grid container spacing={2}>
                    <Grid display={'flex'} flexDirection="row" alignContent={"center"} alignItems="center" padding={1}>
                        <ButtonBase sx={{ width: "50px" }}>

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
                </Grid> */}
            </Paper>

        </div >
    )

}

export default Payment