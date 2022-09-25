import React, { useEffect, useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Client from "./Client";
import { Box, Button } from '@mui/material';
import AlertBox from "./AlertBox";





const Clients = () => {


    const id = localStorage.getItem("userId");

    const [user, setUser] = useState();
    const [clientCount, setClientCount] = useState();
    //for alert
    const [openAlert, setOpenAlert] = useState(false);
    const sendRequest = async () => {
        const res = await axios
            .get(`${process.env.REACT_APP_BASEURL}/api/client/user/${id}`)
            .catch((err) => console.log(err));

        const data = await res.data;
        return data;
    }
    useEffect(() => {
        sendRequest()
            .then((data) => {
                setUser(data.user)
                console.log(data.user.length)
            })

    }, []);

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

                    LinkComponent={Link} to="/client/add"
                >Add Client</Button>
                <Box display='flex' marginLeft='auto'>
                    <Button variant="text" color="primary" size="small" textAlign="right" LinkComponent={Link} to='/userDetail'

                    ><img src={process.env.PUBLIC_URL + '/user.png'} alt="UserImage" height={"30px"} /> | {localStorage.getItem("clientName")}</Button>
                </Box>



            </Box>
            {user &&
                user.clients &&
                user.clients.map((client, index) => (

                    <Client
                        key={index}
                        isClient={true}
                        id={client._id}
                        name={client.name}
                        email={client.email}
                        contact={client.contact}
                        area={client.area}
                        description={client.description}

                    />

                )).reverse()
            }


        </div>
    )

}

export default Clients