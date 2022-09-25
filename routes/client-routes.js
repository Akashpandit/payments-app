import express from 'express';

const router = express.Router();

import { addClient, getAllClients, editClient, deleteClientById, getClientById, userClients } from '../controllers/client-controller.js';

router.post("/addClient", addClient);
router.get("/getclients", getAllClients);
router.put("/edit/:id", editClient);
router.delete("/delete/:id", deleteClientById);
router.get("/:id", getClientById);
router.get("/user/:id", userClients);

export default router;