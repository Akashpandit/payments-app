import React, { useState } from 'react';
import { Typography, Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { authActions } from '../store/Index';

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        name: "",
        contact: "",
        password: ""
    });

    const [isSignup, setIsSignup] = useState(false);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const sendRequest = async (type = "login") => {
        const res = await axios
            .post(`${process.env.REACT_APP_BASEURL}/api/client/${type}`, {
                name: inputs.name,
                contact: inputs.contact,
                password: inputs.password
            })
            .catch((err) => {
                console.log(err)
                window.alert("Invalid credentials")
            });

        const data = await res.data;
        console.log(data);
        return data;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest()
            .then((data) => {
                localStorage.setItem("clientId", data.client._id)
                localStorage.setItem("clientName", data.client.name)

                localStorage.setItem("clientContact", data.client.contact);
                localStorage.setItem("clientArea", data.client.area);
                localStorage.setItem("clientDesc", data.client.description);
            })
            .then(() => dispatch(authActions.login()))
            .then(() => navigate("/payments"));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    maxWidth={400}
                    display="flex"
                    flexDirection={"column"}
                    alignItems="center"
                    justifyContent={"center"}
                    padding={1}
                    boxShadow="1px 1px 20px #ccc"
                    borderRadius={2}

                    sx={{ margin: "auto", marginTop: 5, textAlign: 'center', width: "90%" }}
                >
                    <Typography
                        variant='h4'
                        padding={0}
                        textAlign="center"
                    >Login
                        <hr color='purple' />
                    </Typography>
                    <TextField
                        type={'text'}
                        name='contact'
                        placeholder='Contact No. / Username'
                        value={inputs.contact}
                        margin='dense'
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
                    <Button type="submit" color="primary" variant='contained' sx={{ borderRadius: 2, marginTop: 3 }}>Login</Button>
                </Box>
                <Box textAlign={"center"} flex="1" justifyContent={"flex-end"} flexDirection={"column"}>
                    <Typography display={"absolute"} variant='subtitle2' marginTop={2} marginRight={2} color="#dcdcde">Developed by Akash Pandit</Typography>
                </Box>
            </form>
        </div>
    )


}
export default Auth


