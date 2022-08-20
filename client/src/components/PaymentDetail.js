import React, { useState, useEffect } from "react";
import { Box, Select, MenuItem, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useStyles } from "./Utils";


const labelStyles = { fontSize: "20px", fontWeight: "bold", mb: 0, mt: 1 }

const PaymentDetail = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const id = useParams().id;
    const [payment, setPayment] = useState()
    const [inputs, setInputs] = useState()

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }


    const fetchPaymentDetail = async () => {

        const res = await axios
            .get(`${process.env.REACT_APP_BASEURL}/api/payment/${id}`)
            .catch((err) => console.log(err));

        const data = await res.data;
        return data;
    }

    useEffect(() => {
        fetchPaymentDetail().then((data) => {
            setPayment(data.payment);
            let dateNew = data.payment.date + "";
            dateNew = dateNew.substring(0, 10);
            setInputs({
                amount: data.payment.amount,
                date: dateNew,
                description: data.payment.description,
                paymentMode: data.payment.paymentMode
            })
        })
    }, [id])


    const sendRequest = async () => {

        const res = await axios
            .put(`${process.env.REACT_APP_BASEURL}/api/payment/edit/${id}`, {
                amount: inputs.amount,
                date: inputs.date,
                description: inputs.description,
                paymentMode: inputs.paymentMode,
                client: localStorage.getItem("clientId")
            })
            .catch((err) => console.log(err));

        const data = await res.data;
        return data;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest()
            .then(() => navigate("/payments"))
    }

    return (
        <div>
            {inputs && (
                <form onSubmit={handleSubmit}>
                    <Box

                        borderRadius={2}
                        display="flex"
                        flexDirection={"column"}
                        width="80%"
                        margin="auto"
                        marginTop={3}
                        boxShadow="2px 2px 5px #ccc"
                        padding={3}
                    >
                        <Typography textAlign={"center"} variant="h5">
                            Edit Payment
                            <hr color="purple" />
                        </Typography>
                        <InputLabel
                            className="classes.font"
                            sx={labelStyles}
                        >Amount</InputLabel>
                        <TextField
                            className={classes.font}
                            name="amount"
                            variant="outlined"
                            value={inputs.amount}
                            onChange={handleChange}

                        />
                        <InputLabel
                            className="classes.font"
                            sx={labelStyles}

                        >Date
                        </InputLabel>
                        <TextField
                            className={classes.font}
                            name="date"
                            type={"date"}
                            variant="outlined"
                            value={inputs.date}
                            onChange={handleChange}
                        />
                        <InputLabel
                            className="classes.font"
                            sx={labelStyles}

                        >Description
                        </InputLabel>
                        <TextField
                            className={classes.font}
                            name="description"
                            variant="outlined"
                            value={inputs.description}
                            onChange={handleChange}
                        />
                        <InputLabel
                            className="classes.font"
                            sx={labelStyles}

                        >Payment Mode
                        </InputLabel>
                        <Select
                            name="paymentMode"
                            value={inputs.paymentMode}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={"Cash"}>Cash</MenuItem>
                            <MenuItem value={"Cheque"}>Cheque</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                        <Button
                            sx={{
                                mt: 2,
                                borderRadius: 4
                            }}
                            variant="contained"
                            color="warning"
                            type="submit"
                        >Update</Button>

                    </Box>
                </form>
            )}
        </div>
    )

}

export default PaymentDetail