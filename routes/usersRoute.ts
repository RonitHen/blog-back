import express, { Request, Response } from 'express';
import { UserDataAccess } from '../DAL/UserDataAccess';
import {UserService} from "../services/UserService";
import {UserController} from "../controllers/UserController";
const router = express.Router();
const userController = new UserController(new UserService(new UserDataAccess()));

router.post('/', async (req: Request, res: Response) => await userController.addUser(req,res));

export default router;
