import { UserDataAccess } from '../DAL/UserDataAccess';
import User from '../models/User';
import dotenv from 'dotenv';
dotenv.config();

export class UserService {
    private userDataAccess: UserDataAccess;

    constructor(userDataAccess: UserDataAccess) {
        this.userDataAccess = userDataAccess;
    }

    async addUser(user: User): Promise<string> {
        // @ts-ignore
        if (user.id === process.env.SUB) {
            user = {...user, admin : true }
        }
        try {
            return await this.userDataAccess.add(user);
        } catch (error) {
            throw new Error(`Unable to add Post: ${(error as Error).message}`);
        }
    }
}