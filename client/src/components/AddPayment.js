import React, { useState } from "react";
import { Box, Select, MenuItem, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStyles } from "./Utils";
import { margin } from "@mui/system";

const labelStyles = { fontSize: "20px", fontWeight: "bold", mb: 0, mt: 1 }

const AddPayment = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        amount: "",
        date: "",
        description: "",
        paymentMode: ""

    })

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const sendRequest = async () => {
        const res = await axios
            .post("/api/payment/addPayment", {
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
                        Add Payment
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
                        value={inputs.value}
                        onChange={handleChange}
                        required="true"
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
                        value={inputs.value}
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
                        value={inputs.value}
                        onChange={handleChange}
                    />
                    <InputLabel
                        className="classes.font"
                        sx={labelStyles}

                    >Payment Mode
                    </InputLabel>
                    <Select
                        name="paymentMode"
                        value={inputs.value}
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
                            borderRadius: 2
                        }}
                        variant="contained"
                        color="warning"
                        type="submit"
                    >Add</Button>

                </Box>
            </form>
        </div>
    )

}

export default AddPayment