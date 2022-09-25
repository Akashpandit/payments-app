import React, { useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStyles } from "./Utils";
import AlertBox from "./AlertBox";
import { Link } from 'react-router-dom';

const labelStyles = { fontSize: "20px", fontWeight: "bold", mb: 0, mt: 1 }

const AddClient = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        contact: "",
        area: "",
        description: ""

    })
    const [openAlert, setOpenAlert] = useState(false);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const sendRequest = async () => {
        const res = await axios
            .post(`${process.env.REACT_APP_BASEURL}/api/client/addClient`, {
                name: inputs.name,
                email: inputs.email,
                contact: inputs.contact,
                area: inputs.area,
                description: inputs.description,
                user: localStorage.getItem("userId")
            })
            .catch((err) => console.log(err));

        const data = await res.data;
        return data;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest()
            .then(setOpenAlert(true))
            .then(() => navigate("/clients"))
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <AlertBox
                    title="Success"
                    children="Added Successfully."
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
                        Add New Sender/Receiver
                        <hr color="purple" />
                    </Typography>
                    <InputLabel
                        className="classes.font"
                        sx={labelStyles}
                    >Name</InputLabel>
                    <TextField
                        className={classes.font}
                        name="name"
                        variant="outlined"
                        value={inputs.value}
                        onChange={handleChange}
                        required="true"
                    />
                    <InputLabel
                        className="classes.font"
                        sx={labelStyles}

                    >Email
                    </InputLabel>
                    <TextField
                        className={classes.font}
                        name="email"
                        type={"email"}
                        variant="outlined"
                        value={inputs.value}
                        onChange={handleChange}
                    />
                    <InputLabel
                        className="classes.font"
                        sx={labelStyles}

                    >Contact
                    </InputLabel>
                    <TextField
                        className={classes.font}
                        name="contact"
                        variant="outlined"
                        value={inputs.value}
                        onChange={handleChange}
                    />
                    <InputLabel
                        className="classes.font"
                        sx={labelStyles}

                    >Area
                    </InputLabel>
                    <TextField
                        className={classes.font}
                        name="area"
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

                    <Box textAlign={"center"} mt={2}>


                        <Button
                            sx={{

                                borderRadius: 2,
                                backgroundColor: "#0000ff",

                            }}
                            variant="contained"

                            type="submit"
                        >Add</Button>
                        <Button variant="outlined" color="error" sx={{ marginLeft: 1, borderRadius: 2, }} LinkComponent={Link} to="/payments">Cancel</Button>

                    </Box>
                </Box>
            </form>
        </div>
    )

}

export default AddClient