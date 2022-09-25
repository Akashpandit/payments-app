import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Payment from "./Payment";
import { Box, Button, Typography } from '@mui/material';
import AlertBox from "./AlertBox";





const Payments = () => {

    // const [payments, setPayments] = useState();

    const id = localStorage.getItem("clientId");

    const [client, setClient] = useState();
    const [payCount, setPayCount] = useState();
    const [sumAmt, setSumAmt] = useState(0);
    //for alert
    const [openAlert, setOpenAlert] = useState(false);
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
            .then((data) => {
                setClient(data.client)
                setPayCount(data.client.payments.length)
                console.log(data.client.payments.length)
            })


    }, []);
    function formatAmount(amount) {
        let x = amount + ""
        var lastThree = x.substring(x.length - 3);
        var otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers !== '')
            lastThree = ',' + lastThree;
        amount = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return amount;
    }
    var sumTotal;
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
                        sumTotal = localStorage.getItem("totalSum");
                        // sumTotal = sumTotal / 2;
                        sumTotal = formatAmount(sumTotal)
                        setSumAmt(sumTotal);
                        setOpenAlert(true)
                    }}

                >Show Total</Button>
                <Box display='flex' marginLeft='auto'>
                    <Button variant="text" color="primary" size="small" textAlign="right" LinkComponent={Link} to='/clientDetail'

                    ><img src={process.env.PUBLIC_URL + '/user.png'} alt="UserImage" height={"30px"} /> | {localStorage.getItem("clientName")}</Button>
                </Box>



            </Box>
            {payCount < 1 ? (

                <Typography>Nothing to show. Add payments to see something here.</Typography>
            ) : ("")}
            {client &&
                client.payments &&

                client.payments.map((payment, index) => (

                    < Payment
                        key={index}
                        isClient={true}
                        id={payment._id}
                        amount={payment.amount}
                        date={payment.date}
                        paymentMode={payment.paymentMode}
                        paymentType={payment.paymentType}
                        description={payment.description}

                    />

                )).reverse()
            }


            <AlertBox
                title="Total Amount"
                children={"₹ " + sumAmt}
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}>

            </AlertBox>
        </div>
    )

}

export default Payments