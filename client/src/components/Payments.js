import React, { useEffect, useState } from "react";
import NavBar from './NavBar'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Payment from "./Payment";
import { Box, Card, Typography, TextField, Button, Stack, Alert, AlertTitle } from '@mui/material';





const Payments = () => {

    // const [payments, setPayments] = useState();

    const id = localStorage.getItem("clientId");

    const [client, setClient] = useState();

    const sendRequest = async () => {
        const res = await axios
            .get(`${process.env.REACT_APP_BASEURL}/api/payment/client/${id}`)
            .catch((err) => console.log(err));

        const data = await res.data;
        return data;
    }
    localStorage.setItem("totalSum", 0);
    useEffect(() => {
        sendRequest()
            .then((data) => setClient(data.client))
            .then(() => console.log("Total: " + localStorage.getItem("totalSum") / 2))

    }, []);

    console.log(client);
    return (
        <div>
            <Box container textAlign={"left"} sx={{
                backgroundColor: "#f0f5fc", width: "92%", borderRadius: "5px",

                margin: "auto",
                marginTop: 1,
                padding: 1,
                flexGrow: 1,
                display: "flex",
                alignItems: "space-between"
            }}>
                <Button variant="outlined" color="primary" size="small" sx={{ marginRight: "5px" }}
                    onClick={() => {
                        <NavBar />
                        let sumTotal = localStorage.getItem("totalSum");
                        sumTotal = sumTotal / 2;
                        window.alert(`Total Amount Received ${sumTotal}`)
                    }}
                >Show Total</Button>
                <Box display='flex' marginLeft='auto'>
                    <Button variant="text" color="primary" size="small" textAlign="right" LinkComponent={Link} to='/clientDetail'

                    ><img src={process.env.PUBLIC_URL + '/user.png'} alt="UserImage" height={"30px"} /> | {localStorage.getItem("clientName")}</Button>
                </Box>



            </Box>

            {client &&
                client.payments &&
                client.payments.map((payment, index) => (

                    <Payment
                        key={index}
                        isClient={true}
                        id={payment._id}
                        amount={payment.amount}
                        date={payment.date}
                        paymentMode={payment.paymentMode}
                        description={payment.description}

                    />

                )).reverse()
            }

            {/* Displaying no payments message */}
            {/* {client &&
                client.payments && 
                <Box color={"error"} sx={{
                    width: "92%", borderRadius: "5px",
                    margin: "auto",
                    marginTop: 1,
                    padding: 1,
                    flexGrow: 1,
                    display: "flex",


                }}>
                    <Typography color={"error"} sx={{ textAlign: "center" }} >

                        Nothing to show here
                    </Typography>
                </Box>
            } */}


        </div>
    )

}

export default Payments