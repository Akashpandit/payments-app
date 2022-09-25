import React, { useState } from 'react';
import { Typography, Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { authActions } from '../store/Index';
import AlertBox from './AlertBox';



const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    //Alert Box
    const [openAlert, setOpenAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);


    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const sendRequest = async (type = "login") => {
        setOpenAlert(true)
        const res = await axios
            .post(`${process.env.REACT_APP_BASEURL}/api/user/${type}`, {
                email: inputs.email,
                password: inputs.password
            })
            .catch((err) => {
                console.log(err)
                setErrorAlert(true)
                // window.alert("Invalid credentials")
            });
        setOpenAlert(false)

        const data = await res.data;
        console.log(data);
        return data;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest()
            .then((data) => {
                console.log(data)
                localStorage.setItem("userId", data.user._id)
                localStorage.setItem("userName", data.user.name)
                localStorage.setItem("userEmail", data.user.email)

                localStorage.setItem("userContact", data.user.contact);
                localStorage.setItem("userDesc", data.user.description);
            })
            .then(() => dispatch(authActions.login()))
            .then(() => navigate("/clients"));
    }

    return (
        <div>
            <AlertBox
                title="In Progress"
                children="Please Wait while we log you in"
                color="info"
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}>

            </AlertBox>
            <AlertBox
                title="Failed to Login"
                children="Invalid Credentials"
                color="error"
                openAlert={errorAlert}
                setOpenAlert={setErrorAlert}>

            </AlertBox>
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
                        name='email'
                        placeholder='Email'
                        value={inputs.email}
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
                    <Button type="submit" variant='contained' sx={{ borderRadius: 2, marginTop: 3, backgroundColor: "#0000ff" }}>Login</Button>
                </Box>
                <Box textAlign={"center"} flex="1" justifyContent={"flex-end"} flexDirection={"column"}>
                    <Typography display={"absolute"} variant='subtitle2' marginTop={2} marginRight={2} color="#dcdcde">Developed by Akash Pandit</Typography>
                </Box>
            </form>
        </div>
    )


}
export default Auth


