import * as React from 'react';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Button, Divider } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AlertBox from './AlertBox';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const Client = ({ name, contact, email, area, description, isUser, id }) => {
    const navigate = useNavigate();


    //alert box
    const [openAlert, setOpenAlert] = useState(false);


    const handleEdit = () => {
        navigate(`/clients/${id}`);
    }
    //save client detail to local storage

    const deleteRequest = async () => {
        const res = await axios
            .delete(`${process.env.REACT_APP_BASEURL}/api/client/delete/${id}`)
            .catch((err) => console.log(err))

        const data = await res.data;
        return data;
    }

    const handleDelete = () => {


        if (window.confirm("Are you sure?")) {
            deleteRequest()
                .then(setOpenAlert(true))
                .then(() => navigate("/"))
                .then(() => navigate("/clients"))
                .then(() => window.location.reload())
        }


    }
    const moreDetails = () => {
        localStorage.setItem("clientId", id)
        navigate("/client/payments")
    }

    //set total amount


    return (
        <div >
            <AlertBox
                title="Success"
                children=" Deleted Successfully"
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
            ></AlertBox>
            <Paper
                sx={{
                    width: "88%",
                    margin: "auto",
                    marginTop: 2,
                    padding: 1,
                    flexGrow: 1,
                    boxShadow: "1px 2px 10px #ccc",
                    ":hover": {
                        boxShadow: "10px 10px 20px #ccc",
                    },
                }}
            >
                <Grid spacing={2} display="flex" flexDirection={"row"}>
                    <Grid paddingRight={"6px"} display={'flex'} flexDirection="row" alignContent={"center"} alignItems="center" justifyContent={'center'} >

                        <ButtonBase sx={{ width: "40px" }}>

                            {<Img alt="Cash" src={process.env.PUBLIC_URL + '/cash-icon.png'} />}

                        </ButtonBase>
                    </Grid>
                    <Grid display={"flex"} flexGrow={1} alignContent={"center"} alignItems="center">
                        <Grid display={"flex"} flexDirection="column" >
                            <Grid display={"flex"} flexDirection="column" alignContent={"center"} alignItems="left">
                                <Typography
                                    sx={{
                                        marginBottom: 0, padding: 0, marginTop: 0

                                    }}
                                    gutterBottom variant="h6" >
                                    {name}
                                </Typography>
                                <Typography
                                    sx={{
                                        marginBottom: 0,
                                        padding: 0,
                                        marginTop: 0,

                                    }}
                                    variant="subtitle2" >
                                    {email}
                                    <Divider />
                                </Typography>

                            </Grid>
                            <Grid display={"flex"} flexDirection="column">

                                <Typography style={{ overflowWrap: 'break-word' }}

                                    variant="body2" >

                                    {description}
                                </Typography>

                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid xs={4} display={"flex"} flexDirection="column" alignItems="end" justifyContent={'center'} sx={{ padding: "1px" }}>

                        <Typography
                            sx={{
                                color: "#422ade",
                                paddingRight: "1px",
                                fontSize: "125%"


                            }}
                        >
                            <Button sx={{ borderRadius: 1 }} variant="outlined" onClick={moreDetails}>Show Transactions</Button>

                        </Typography>


                        <Grid display={"flex"} mt={"7px"} >
                            <Button sx={{ padding: "0px", borderRight: "1px solid", borderRadius: 0 }} onClick={handleEdit} endIcon={<Img alt="edit" width={"20px"} src={process.env.PUBLIC_URL + '/edit.png'} />}></Button>
                            <Button sx={{ padding: "0px" }} onClick={handleDelete} startIcon={<Img alt="edit" width={"20px"} src={process.env.PUBLIC_URL + '/delete.png'} />}> </Button>
                        </Grid>

                    </Grid>

                </Grid>


            </Paper>

        </div >
    )

}

export default Client