import express from 'express';

const router = express.Router();
import { signup, login, getAllUsers } from '../controllers/user-controller.js';

router.post("/signup", signup);
router.post("/login", login);
router.get("/getusers", getAllUsers);

export default router;