import React, { useState } from 'react';
import { Typography, Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { authActions } from '../store/Index';
import AlertBox from './AlertBox';

const AuthSignup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        contact: "",
        password: "",
        description: ""
    });

    //Alert Box
    const [openAlert, setOpenAlert] = useState(false);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const sendRequest = async (type = "signup") => {
        const res = await axios
            .post(`${process.env.REACT_APP_BASEURL}/api/user/${type}`, {
                name: inputs.name,
                email: inputs.email,
                contact: inputs.contact,
                password: inputs.password,
                description: inputs.description
            })
            .catch((err) => console.log(err));
        console.log(res)
        const data = await res.data;
        console.log(data);
        return data;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest()
            .then((data) => localStorage.setItem("userId", data.user._id))
            .then(() => dispatch(authActions.logout()))
            .then(() => navigate("/auth"))
            .then(setOpenAlert(true));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <AlertBox
                    title="Success"
                    children="User Added Successfully. Login to Continue"
                    openAlert={openAlert}
                    setOpenAlert={setOpenAlert}
                ></AlertBox>
                <Box

                    display="flex"
                    flexDirection={"column"}
                    alignItems="center"
                    justifyContent={"center"}
                    padding={1}
                    boxShadow="1px 1px 20px #ccc"

                    borderRadius={2}
                    sx={{ margin: "auto", marginTop: 3, textAlign: 'center', width: "90%" }}
                >
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
                        type={'email'}
                        name='email'
                        placeholder='Email'
                        value={inputs.email}
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


