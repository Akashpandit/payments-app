import { Button, Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react'

export default function AlertBox(props) {

    const { title, children, openAlert, setOpenAlert, color = "primary" } = props;
    return (
        <Dialog open={openAlert} maxWidth="md"  >
            <div style={{ padding: 10 }}>
                <DialogTitle style={{ padding: 5, borderBottom: "1px solid purple" }}>
                    <div style={{ display: "flex" }} >
                        <Typography variant='h6' textAlign={"center"} component={"div"} style={{ flexGrow: 1, marginRight: "10px" }}>

                            {title}


                        </Typography>

                    </div>
                </DialogTitle>
                <DialogContent>
                    <Typography variant='h6' mt={2} textAlign={"center"} color={color}>

                        {children}
                    </Typography>

                </DialogContent>
                <Box textAlign={"center"}>

                    <Button onClick={() => setOpenAlert(false)} variant='contained' style={{ width: "5px", padding: 0, backgroundColor: "#0000ff" }}  >OK</Button>
                </Box>

            </div>
        </Dialog>
    )
}
