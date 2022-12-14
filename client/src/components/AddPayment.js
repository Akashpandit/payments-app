import React, { useState } from "react";
import { Box, Select, MenuItem, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStyles } from "./Utils";
import AlertBox from "./AlertBox";
import { Link } from 'react-router-dom';

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
    const [openAlert, setOpenAlert] = useState(false);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const sendRequest = async () => {
        setOpenAlert(true)
        const res = await axios
            .post(`${process.env.REACT_APP_BASEURL}/api/payment/addPayment`, {
                amount: inputs.amount,
                date: inputs.date,
                description: inputs.description,
                paymentMode: inputs.paymentMode,
                client: localStorage.getItem("clientId")
            })
            .catch((err) => console.log(err));
        setOpenAlert(false)

        const data = await res.data;
        return data;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest()
            // .then(setOpenAlert(true))
            .then(() => navigate("/client/payments"))
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <AlertBox
                    title="Success"
                    children="Adding Payment. Please Wait."
                    openAlert={openAlert}
                    setOpenAlert={setOpenAlert}
                ></AlertBox>
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
                        label="payMode"
                        onChange={handleChange}

                    >
                        <MenuItem value={"Cash"}>Cash</MenuItem>
                        <MenuItem value={"UPI"}>UPI</MenuItem>
                        <MenuItem value={"Cheque"}>Cheque</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                    <InputLabel
                        className="classes.font"
                        sx={labelStyles}

                    >Payment Type
                    </InputLabel>
                    <Select
                        name="paymentType"
                        value={inputs.value}
                        label="payType"
                        onChange={handleChange}

                    >
                        <MenuItem value={"Received"}>Received</MenuItem>
                        <MenuItem value={"Sent"}>Sent</MenuItem>
                    </Select>
                    <Box textAlign={"center"} mt={2}>


                        <Button
                            sx={{

                                borderRadius: 2,
                                backgroundColor: "#0000ff",

                            }}
                            variant="contained"

                            type="submit"
                        >Add</Button>
                        <Button variant="outlined" color="error" sx={{ marginLeft: 1, borderRadius: 2, }} LinkComponent={Link} to="/client/payments">Cancel</Button>

                    </Box>
                </Box>
            </form>
        </div>
    )

}

export default AddPayment