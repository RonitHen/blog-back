import {Request, Response} from 'express';
import User from '../models/User';
import {UserService} from '../services/UserService';

export class UserController {

    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async addUser(req: Request, res: Response): Promise<void> {
        const userData = req.body;
        const newUser = new User(userData.sub, userData.email, userData.name, userData.first_name, false);
        try {
            const resMessage = await this.userService.addUser(newUser);
            res.status(201).send({ message: resMessage });
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }
}