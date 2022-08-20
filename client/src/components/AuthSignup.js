import React, { useState } from 'react';
import { Typography, Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { authActions } from '../store/Index';

const AuthSignup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        name: "",
        contact: "",
        password: "",
        area: "",
        description: ""
    });

    const [isSignup, setIsSignup] = useState(false);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const sendRequest = async (type = "signup") => {
        const res = await axios
            .post(`${process.env.REACT_APP_BASEURL}/api/client/${type}`, {
                name: inputs.name,
                contact: inputs.contact,
                password: inputs.password,
                area: inputs.area,
                description: inputs.description
            })
            .catch((err) => console.log(err));

        const data = await res.data;
        console.log(data);
        return data;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest()
            .then((data) => localStorage.setItem("clientId", data.client._id))
            .then(() => dispatch(authActions.logout()))
            .then(() => window.alert("Client added successfully. Login to Continue."))
            .then(() => navigate("/auth"));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box

                    display="flex"
                    flexDirection={"column"}
                    alignItems="center"
                    justifyContent={"center"}
                    padding={1}
                    boxShadow="1px 1px 20px #ccc"

                    borderRadius={2}
                    sx={{ margin: "auto", textAlign: 'center', width: "90%" }}
                    marginTop={5}>
                    <Typography
                        variant='h4'
                        padding={1}
                        textAlign="center"
                    >SignUp
                        <hr color='purple' />
                    </Typography>
                    <TextField
                        type={'text'}
                        name='name'
                        placeholder='Name'
                        value={inputs.name}
                        sx={{ margin: "5px", width: "90%" }}
                        onChange={handleChange}
                    />
                    <TextField
                        maxWidth={"90%"}
                        type={'text'}
                        name='contact'
                        placeholder='Contact Number'
                        value={inputs.contact}
                        sx={{ margin: "5px", width: "90%" }}
                        onChange={handleChange}
                    />



                    <TextField
                        type={'password'}
                        name='password'
                        placeholder='Password'
                        sx={{ margin: "5px", width: "90%" }}
                        value={inputs.password}
                        onChange={handleChange}
                    />
                    <TextField
                        type={'text'}
                        name='area'
                        placeholder='Area'
                        value={inputs.area}
                        sx={{ margin: "5px", width: "90%" }}
                        onChange={handleChange}
                    />
                    <TextField
                        type={'text'}
                        name='description'
                        placeholder='Description'
                        value={inputs.description}
                        sx={{ margin: "5px", width: "90%" }}
                        onChange={handleChange}
                    />
                    <Box>

                        <Button type="submit" color="primary" variant='contained' sx={{ borderRadius: 2, marginTop: 1 }}>Signup</Button>
                        <Button color="primary" variant='outlined' sx={{ marginTop: 1, marginLeft: 1, borderRadius: 2, backgroundColor: "white", color: "blue" }} LinkComponent={Link} to="/auth">Login</Button>
                    </Box>
                </Box>
                <Box textAlign={"center"} flex="1" justifyContent={"flex-end"} flexDirection={"column"}>

                    <Typography display={"absolute"} variant='subtitle2' marginTop={2} marginRight={2} color="#dcdcde">Developed by Akash Pandit</Typography>
                </Box>


            </form>
        </div>
    )


}
export default AuthSignup


